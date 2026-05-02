import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { google } from 'googleapis';

const app = express();

const PORT = Number(process.env.PORT || 8787);
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1OcRdYjqd30tvDFwKwV-zlmtsujDtQnVoYGQAK_9lviM';
const GOOGLE_SHEET_RANGE = process.env.GOOGLE_SHEET_RANGE || 'A:F';
const GOOGLE_SHEET_READ_RANGE = process.env.GOOGLE_SHEET_READ_RANGE || GOOGLE_SHEET_RANGE;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function buildCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON);
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (email && privateKey) {
    return {
      client_email: email,
      private_key: privateKey.replace(/\\n/g, '\n')
    };
  }

  throw new Error(
    'Missing Google credentials. Set GOOGLE_SERVICE_ACCOUNT_KEY_JSON or GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY.'
  );
}

let sheetsClientPromise;
async function getSheetsClient() {
  if (!sheetsClientPromise) {
    const credentials = buildCredentials();
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    sheetsClientPromise = Promise.resolve(google.sheets({ version: 'v4', auth }));
  }

  return sheetsClientPromise;
}

function isGiftPayload(gifts) {
  return (
    Array.isArray(gifts) &&
    gifts.length >= 3 &&
    gifts.every(
      (gift) =>
        gift &&
        typeof gift.gift === 'string' &&
        gift.gift.trim().length > 0 &&
        typeof gift.score === 'number'
    )
  );
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/assessments', async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const timestamp =
    typeof req.body?.timestamp === 'string' && req.body.timestamp.trim().length > 0
      ? req.body.timestamp
      : new Date().toISOString();
  const gifts = req.body?.gifts;
  const primaryGift = typeof req.body?.primaryGift === 'string' ? req.body.primaryGift : '';
  const secondaryGift = typeof req.body?.secondaryGift === 'string' ? req.body.secondaryGift : '';
  const tertiaryGift = typeof req.body?.tertiaryGift === 'string' ? req.body.tertiaryGift : '';

  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!primaryGift || !secondaryGift || !tertiaryGift) {
    return res.status(400).json({ error: 'Primary, secondary, and tertiary gifts are required.' });
  }
  if (!isGiftPayload(gifts)) {
    return res.status(400).json({ error: 'Invalid gift score payload.' });
  }

  const rowValues = [name, primaryGift, secondaryGift, tertiaryGift, timestamp, JSON.stringify(gifts)];

  try {
    const sheets = await getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: GOOGLE_SHEET_RANGE,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues]
      }
    });

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error('Failed to append assessment row:', error);
    res.status(500).json({ error: 'Could not save assessment to Google Sheets.' });
  }
});

app.get('/api/assessments', async (_req, res) => {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: GOOGLE_SHEET_READ_RANGE
    });

    const rows = response.data.values || [];
    const results = rows
      .filter((row) => row?.[0] && row[0] !== 'Team Member')
      .map((row, index) => {
        const [name, primaryGift, secondaryGift, tertiaryGift, timestamp, giftsJson] = row;

        let gifts = [];
        if (giftsJson) {
          try {
            gifts = JSON.parse(giftsJson);
          } catch (error) {
            gifts = [];
          }
        }

        return {
          key: `${timestamp || 'row'}-${index}`,
          name: name || '',
          primaryGift: primaryGift || '',
          secondaryGift: secondaryGift || '',
          tertiaryGift: tertiaryGift || '',
          timestamp: timestamp || '',
          gifts
        };
      });

    res.json({ results });
  } catch (error) {
    console.error('Failed to read assessment rows:', error);
    res.status(500).json({ error: 'Could not load assessment results from Google Sheets.' });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

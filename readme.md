# Spiritual Gifts Assessment

This repo is now a full-stack app:
- React frontend for participants (`/`) and admin viewer (`/admin`)
- Express backend API that writes and reads Google Sheets

## What gets written to your sheet

Target spreadsheet:
`1OcRdYjqd30tvDFwKwV-zlmtsujDtQnVoYGQAK_9lviM`

Each submission appends:
- `A`: Team Member
- `B`: Primary Gift
- `C`: Secondary Gift
- `D`: Third Gift
- `E`: Timestamp (ISO)
- `F`: Full gift score JSON (used by admin details/export)

Your existing A-D table format is preserved.

## 1. Google setup (required)

1. In Google Cloud, enable **Google Sheets API**.
2. Create a **Service Account**.
3. Create and download a JSON key for that service account.
4. Open your Google Sheet and share it with the service account email as **Editor**.

## 2. Environment setup

1. Copy:
```bash
cp .env.example .env
```
2. Fill one credential method in `.env`:
- `GOOGLE_SERVICE_ACCOUNT_KEY_JSON` (recommended), or
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` + `GOOGLE_PRIVATE_KEY`

Defaults already point to your sheet ID.

## 3. Install and run

```bash
npm install
npm run dev
```

Endpoints:
- Frontend: `http://localhost:5173`
- Admin viewer: `http://localhost:5173/admin`
- Backend API: `http://localhost:8787`

## GitHub Pages publish (current repo setup)

Your repo is currently configured to publish from `main` branch `/docs`.

Before pushing to GitHub Pages:

```bash
npm run build:pages
cp docs/index.html docs/404.html
touch docs/.nojekyll
```

Then commit and push the generated `docs/` folder.

Important:
- This deploys the frontend only (static files).
- The `/api` backend and Google Sheets server code do not run on GitHub Pages.
- For live form submissions, host the backend separately (Render, Railway, Fly.io, etc.) and point frontend API calls to that backend URL.

## 4. Verify submission flow

1. Open `http://localhost:5173`
2. Complete the assessment
3. Confirm the new row appears in your Google Sheet
4. Open `http://localhost:5173/admin` to confirm viewer can read from sheet

## Notes

- If sheet writes fail, check:
  - service account has editor access to the spreadsheet
  - credentials in `.env` are valid
  - `GOOGLE_PRIVATE_KEY` keeps escaped newlines (`\n`) if using split mode
- The old `window.storage` artifact flow was removed and replaced with API-backed persistence.

const { useState } = React;

const GOOGLE_SCRIPT_WEB_APP_URL = '1kQkfWD63fB7f-L48lUusFoFMaUaWcjMG4CBZ2IEWtVQ';

function SimpleIcon({ symbol, size = 24, color = 'currentColor' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        fontSize: Math.max(14, Math.round(size * 0.72)),
        lineHeight: 1,
        color
      }}
    >
      {symbol}
    </span>
  );
}

const ChevronRight = (props) => <SimpleIcon symbol="›" {...props} />;
const ChevronLeft = (props) => <SimpleIcon symbol="‹" {...props} />;
const Award = (props) => <SimpleIcon symbol="✦" {...props} />;
const Heart = (props) => <SimpleIcon symbol="♥" {...props} />;
const BookOpen = (props) => <SimpleIcon symbol="▤" {...props} />;
const MessageCircle = (props) => <SimpleIcon symbol="◉" {...props} />;
const Gift = (props) => <SimpleIcon symbol="◆" {...props} />;
const Users = (props) => <SimpleIcon symbol="◌" {...props} />;
const Handshake = (props) => <SimpleIcon symbol="✚" {...props} />;
const Compass = (props) => <SimpleIcon symbol="◎" {...props} />;

const QUESTIONS = [
  "I think of ways to help others who are suffering physically, emotionally, and spiritually.",
  "I enjoy spending time in intense study and research of the Bible.",
  "I feel people should say what they mean and mean what they say about God's truth even though it may hurt the feelings of the listener.",
  "I give more than the biblical tithe to the Lord's work.",
  "I enjoy responsibilities which involve helping other Christians grow spiritually.",
  "I enjoy doing small tasks that need to be done, without being asked to do them.",
  "I like to take a project, break it down into various parts, and systematically organize a plan to accomplish the final goal.",
  "I find it very difficult to discipline others unless I am really convinced it will help them.",
  "In studying the bible, I like to study the passage in context and find what it meant to the writer before trying to apply it to myself.",
  "When situations are not right, I feel an urge to speak up about them in order to correct them.",
  "When I hear of someone in need, I think of the amount of money I can give them.",
  "I am a possibility thinker, believing that all things are possible with God.",
  "I would rather do a task myself than work with a group or committee to get it done.",
  "If a project needs to be done and no one is in charge, I like to volunteer to get it organized.",
  "I can sense immediately whether a person I am talking to is hurting, or is really happy.",
  "I organize my thoughts in a systematic way after careful research and study.",
  "I have the unique ability to discern deception, dishonesty, and compromise in the motives and actions of others.",
  "I prefer to give to the work of the Lord amounts suggested by the Lord rather than have other suggest how much I should give.",
  "I have the ability to help people see how their trials and difficulties can be opportunities for spiritual growth.",
  "I would rather do a number of short-range immediate tasks than do one long-range task taking a year or more.",
  "I have the ability to see over-all goals and the \"finished picture\" of a project, when others may only see the various pieces.",
  "I will go to almost any length to avoid hurting the feelings of others.",
  "I like to see things prepared and taught in a systematic, factual way rather than having people share just personal experiences.",
  "Injustice, dishonesty, and unrighteousness in the church and community bother me enough that I am willing to speak up even though some may be offended.",
  "When I feel led by the Lord to give, I give generously without thinking of the sacrifice this may involve.",
  "I would rather talk to someone about their personal problems and share with them practical help from the Bible than send them to someone else.",
  "I find it difficult to say \"no\" when I see something practical which can be done to help someone in need.",
  "I would rather train others to do various tasks rather than doing everything myself.",
  "I like to speak kind, comforting, reassuring words to others and I am hurt when I hear others speak harshly.",
  "I enjoy communicating biblical truths to others and seeing long-range growth in knowledge of Christian faith.",
  "I have a desire to share with others messages I believe are from God which can correct, encourage, and comfort them.",
  "I enjoy making my home available for entertaining overnight guests who are involved in God's work.",
  "I enjoy meeting regularly over a period of time with individuals to help them grow spiritually.",
  "I enjoy serving the needs of others in order to free them for more important work for the Lord.",
  "I have the ability to organize people, resources, plans, timetables in order to accomplish the Lord's work effectively.",
  "When others are hurting or in pain, I can feel for them, even to the point of becoming emotionally involved.",
  "I have the ability to explain difficult issues, after giving them much thought and study.",
  "I am able to communicate my thoughts directly and frankly to close friends, even though they may disagree with me.",
  "I think it is sinful if a person fails to manage his/her financial assets well.",
  "I enjoy teaching and sharing with others, especially when I can apply the Bible to daily life.",
  "I enjoy doing routine tasks to help others, even though the tasks seem menial.",
  "I feel comfortable delegating responsibilities to others and directing a plan through to completion.",
  "I am primarily attracted to people who express tenderness and kindness.",
  "I enjoy researching answers to difficult questions.",
  "When I fail to live up to the standards of Christian living which I feel is important, I become very discouraged with myself.",
  "I really enjoy giving money and other material resources to Christian causes.",
  "When sharing Christian truth, I enjoy illustrating it with personal examples to make it more practical.",
  "I need reassurance that what I do to help other people is appreciated.",
  "I am able with discipline to work under pressure and accomplish things, as long as I know my goals and objectives.",
  "I feel deep compassion and understanding for those with spiritual and emotional needs.",
  "The meaning of words and how people use them is important to me.",
  "I speak up about what I believe is right and wrong, regardless of whether others agree or not.",
  "I receive special joy in encouraging others to be more generous in their giving.",
  "I really enjoy sharing the practical teaching of the Scripture as it relates to the personal and emotional problems of people.",
  "When I provide things for others, I would rather give them something I made myself than something I bought.",
  "In a leadership position, I feel more joy than frustration or burden.",
  "I like to be involved in alleviating the sufferings of others.",
  "When I hear a message I like, I check out the facts and details if I am uncertain rather than accept the speaker's word without question.",
  "When I sense the problems and the needs of the world, I am burdened to spend long periods of time in intercessory prayer.",
  "When I give money or other tangible help to others, I like to do it anonymously.",
  "I like to simplify complex issues into practical steps to help people grow spiritually.",
  "I am a now person, and when I see a need, I want to meet it right away rather than wait for a more convenient time.",
  "I enjoy being responsible for the success of the organization or group of which I am a part.",
  "I avoid leadership positions where I will have to carry out decisions, which may hurt the feelings of some people.",
  "I enjoy devoting great amounts of time to studying the Bible to learn the truth.",
  "When I share God's truth with others, I need to see that this brings about the change that God desires for them.",
  "I enjoy living at a lower standard of living than necessary in order to have more to give to the Lord's work.",
  "I like to share with others the confidence that in spite of outward circumstances, trials, and set-backs, God always keeps His promise.",
  "When I hear of some practical need that someone has, I am willing to volunteer to help meet it.",
  "I am willing to endure the misunderstanding and reaction of others when working on a plan, because I know the end results of what I am seeking to accomplish."
];

const GIFT_MAPPING = {
  Mercy: [0, 7, 14, 21, 28, 35, 42, 49, 56, 63],
  Teaching: [1, 8, 15, 22, 29, 36, 43, 50, 57, 64],
  Prophecy: [2, 9, 16, 23, 30, 37, 44, 51, 58, 65],
  Giving: [3, 10, 17, 24, 31, 38, 45, 52, 59, 66],
  Exhortation: [4, 11, 18, 25, 32, 39, 46, 53, 60, 67],
  Serving: [5, 12, 19, 26, 33, 40, 47, 54, 61, 68],
  Administration: [6, 13, 20, 27, 34, 41, 48, 55, 62, 69]
};

const GIFT_DESCRIPTIONS = {
  Mercy: {
    title: "Mercy",
    icon: Heart,
    description: "Cheerful acts of compassion characterize those with the gift of mercy. You empathize deeply with hurting members and keep the body healthy and unified by maintaining awareness of needs within the church.",
    characteristics: [
      "Feel deep compassion for those suffering",
      "Attracted to people who express tenderness and kindness",
      "Avoid situations that might hurt others' feelings",
      "Become emotionally involved when others are in pain",
      "Prefer speaking kind, comforting words"
    ],
    strengths: "Your empathy and compassion create safe spaces for healing. You're often the first to notice when someone is struggling and the first to offer comfort.",
    cautions: "Be careful not to enable unhealthy behaviors out of a desire to avoid conflict. Set healthy boundaries while still showing compassion."
  },
  Teaching: {
    title: "Teaching",
    icon: BookOpen,
    description: "Teaching is instructing members in the truths and doctrines of God's Word for the purposes of building up, unifying, and maturing the body.",
    characteristics: [
      "Enjoy intense study and research of the Bible",
      "Study passages in context before application",
      "Organize thoughts systematically after careful research",
      "Prefer systematic, factual teaching methods",
      "Value word meanings and accurate communication"
    ],
    strengths: "Your systematic approach to truth helps others build solid biblical foundations. You bring clarity to complex topics and help people grow in knowledge.",
    cautions: "Remember that head knowledge must lead to heart transformation. Balance accurate teaching with practical application."
  },
  Prophecy: {
    title: "Prophecy",
    icon: MessageCircle,
    description: "The gift of prophecy is proclaiming the Word of God boldly. This builds up the body and leads to conviction of sin. It manifests itself in preaching and teaching.",
    characteristics: [
      "Believe in speaking truth even if it hurts feelings",
      "Feel compelled to speak up when situations aren't right",
      "Can discern deception and dishonesty in others",
      "Speak up about right and wrong regardless of agreement",
      "Hold high standards and become discouraged when failing to meet them"
    ],
    strengths: "Your boldness in proclaiming truth protects the church from error and calls people to righteousness. You're not afraid to address difficult issues.",
    cautions: "Remember to speak the truth in love. Your directness can wound if not balanced with grace and patience."
  },
  Giving: {
    title: "Giving",
    icon: Gift,
    description: "Those with the gift of giving give freely and joyfully to the work and mission of the body. Cheerfulness and liberality characterize individuals with this gift.",
    characteristics: [
      "Give more than the biblical tithe",
      "Think of financial help when hearing of needs",
      "Prefer the Lord to guide giving amounts",
      "Give generously without considering sacrifice",
      "Consider poor financial stewardship sinful"
    ],
    strengths: "Your generosity fuels kingdom work and demonstrates God's provision. You find joy in meeting needs and see resources as tools for ministry.",
    cautions: "Ensure your giving doesn't create unhealthy dependencies. Balance generosity with wisdom about long-term solutions."
  },
  Exhortation: {
    title: "Exhortation",
    icon: Users,
    description: "Those with this gift encourage members to be involved in and enthusiastic about the work of the Lord. They are good counselors and motivate others to service.",
    characteristics: [
      "Enjoy helping Christians grow spiritually",
      "See possibilities and believe all things are possible with God",
      "Help people see trials as opportunities for growth",
      "Prefer talking through problems rather than referring",
      "Enjoy applying the Bible to daily life and personal problems"
    ],
    strengths: "Your encouragement lifts others and helps them see potential. You motivate people to keep going and grow through their challenges.",
    cautions: "Not everyone is ready for the positive perspective. Sometimes people need to lament before they can move forward."
  },
  Serving: {
    title: "Serving",
    icon: Handshake,
    description: "Those with the gift of service recognize practical needs in the body and joyfully give assistance to meeting those needs. They don't mind working behind the scenes.",
    characteristics: [
      "Enjoy doing small tasks without being asked",
      "Prefer doing tasks yourself rather than committees",
      "Would rather do short-range immediate tasks",
      "Find it difficult to say no when seeing practical needs",
      "Enjoy routine tasks even if they seem menial"
    ],
    strengths: "Your practical service keeps the church functioning smoothly. You meet needs others might overlook and find fulfillment in tangible help.",
    cautions: "Learn to say no sometimes. Your willingness to serve can lead to burnout if you don't maintain healthy boundaries."
  },
  Administration: {
    title: "Administration",
    icon: Compass,
    description: "Administration enables the body to organize according to God-given purposes and long-term goals. It helps steer others to remain on task.",
    characteristics: [
      "Like breaking down projects into organized plans",
      "Volunteer to organize when no one is in charge",
      "See overall goals and the finished picture",
      "Prefer training others rather than doing everything yourself",
      "Feel comfortable delegating and directing plans to completion"
    ],
    strengths: "Your organizational skills turn vision into reality. You create structures and systems that help the church accomplish its mission efficiently.",
    cautions: "Remember that people are more important than plans. Flexibility and grace in the process matter as much as reaching the goal."
  }
};

const PRIMARY_SECONDARY_COMBINATIONS = {
  "Mercy-Teaching": "Your compassionate heart (Mercy) combined with your love of truth (Teaching) makes you an exceptional counselor. You can both understand people's pain and guide them with biblical wisdom, creating a safe space for growth and healing.",
  "Mercy-Prophecy": "This is an interesting combination! Your tender heart (Mercy) is balanced by your commitment to truth (Prophecy). You speak hard truths with unusual gentleness, and your empathy prevents your directness from becoming harsh.",
  "Mercy-Giving": "Your compassion (Mercy) paired with generosity (Giving) makes you highly responsive to needs. You not only feel deeply for those suffering but also have the resources and willingness to provide tangible help.",
  "Mercy-Exhortation": "Your empathy (Mercy) combined with encouragement (Exhortation) creates a powerful ministry of comfort. You feel others' pain deeply and have the gift of lifting their spirits and helping them see hope.",
  "Mercy-Serving": "Both gifts focus on meeting needs! Your compassionate awareness (Mercy) paired with practical action (Serving) means you notice when people are hurting and immediately look for tangible ways to help.",
  "Mercy-Administration": "Your compassionate heart (Mercy) with organizational skills (Administration) allows you to create systems and structures that genuinely care for people. You organize ministries with people's wellbeing at the center.",
  
  "Teaching-Mercy": "Your systematic approach to truth (Teaching) is softened by compassion (Mercy). You teach with both accuracy and sensitivity, making biblical truth accessible and healing.",
  "Teaching-Prophecy": "Both gifts value truth! Your love of study (Teaching) combined with bold proclamation (Prophecy) makes you a powerful preacher or teacher who presents God's Word with both accuracy and conviction.",
  "Teaching-Giving": "Your commitment to truth (Teaching) paired with generosity (Giving) might lead you to invest significantly in biblical resources, education, or supporting teaching ministries. You see the value of investing in truth.",
  "Teaching-Exhortation": "Your systematic teaching (Teaching) combined with practical application (Exhortation) makes you excellent at discipleship. You help people understand truth and apply it to their daily lives.",
  "Teaching-Serving": "Your love of truth (Teaching) paired with practical service (Serving) means you might serve through teaching ministries - preparing materials, organizing study resources, or supporting teachers behind the scenes.",
  "Teaching-Administration": "Your systematic approach to truth (Teaching) combined with organizational skills (Administration) makes you excellent at curriculum development, educational programs, or structuring learning experiences.",
  
  "Prophecy-Mercy": "This powerful combination balances truth and grace. Your boldness (Prophecy) is tempered by compassion (Mercy), allowing you to speak difficult truths in ways that heal rather than wound.",
  "Prophecy-Teaching": "Both gifts value truth! Your bold proclamation (Prophecy) is supported by careful study (Teaching), giving your words both conviction and accuracy.",
  "Prophecy-Giving": "Your commitment to righteousness (Prophecy) paired with generosity (Giving) might lead you to support ministries that stand for truth, or to give sacrificially to causes you believe in deeply.",
  "Prophecy-Exhortation": "Your directness (Prophecy) combined with encouragement (Exhortation) creates a powerful ministry of correction and motivation. You call people to righteousness while inspiring them to pursue it.",
  "Prophecy-Serving": "Your bold truth-telling (Prophecy) paired with humble service (Serving) keeps you grounded. You speak boldly but also demonstrate truth through practical action.",
  "Prophecy-Administration": "Your vision for righteousness (Prophecy) combined with organizational skills (Administration) allows you to create structures and systems that promote truth and godliness in the church.",
  
  "Giving-Mercy": "Your generosity (Giving) combined with compassion (Mercy) makes you incredibly responsive to needs. You not only notice when people are hurting but immediately think of how your resources can help.",
  "Giving-Teaching": "Your generosity (Giving) paired with love of truth (Teaching) might lead you to invest heavily in biblical resources, education, or supporting teaching ministries. You see the value of investing in truth.",
  "Giving-Prophecy": "Your generosity (Giving) combined with commitment to righteousness (Prophecy) means you give strategically to causes that align with your convictions and advance God's kingdom.",
  "Giving-Exhortation": "Your generosity (Giving) paired with encouragement (Exhortation) means you give both resources and hope. Your giving often comes with words of encouragement and vision for what's possible.",
  "Giving-Serving": "Both gifts focus on meeting practical needs! Your financial generosity (Giving) is paired with hands-on help (Serving), making you incredibly effective at addressing tangible needs.",
  "Giving-Administration": "Your generosity (Giving) combined with organizational skills (Administration) makes you excellent at managing resources, building budgets, or organizing stewardship initiatives.",
  
  "Exhortation-Mercy": "Your encouragement (Exhortation) combined with compassion (Mercy) creates a powerful ministry of comfort and hope. You feel others' pain and have the gift of helping them see the way forward.",
  "Exhortation-Teaching": "Your practical application (Exhortation) paired with systematic truth (Teaching) makes you excellent at discipleship - helping people both understand and apply biblical principles.",
  "Exhortation-Prophecy": "Your encouragement (Exhortation) balanced with bold truth (Prophecy) allows you to motivate people toward righteousness. You inspire growth while calling out compromise.",
  "Exhortation-Giving": "Your encouragement (Exhortation) combined with generosity (Giving) means you give both resources and hope. Your gifts often come with words of vision and possibility.",
  "Exhortation-Serving": "Your encouragement (Exhortation) paired with practical service (Serving) means you motivate others while also rolling up your sleeves to help. You inspire by both words and example.",
  "Exhortation-Administration": "Your encouragement (Exhortation) combined with organizational skills (Administration) allows you to motivate teams and structure ministries that help people grow.",
  
  "Serving-Mercy": "Both gifts focus on caring for people! Your practical help (Serving) is motivated by genuine compassion (Mercy), making your service both effective and deeply caring.",
  "Serving-Teaching": "Your practical nature (Serving) paired with love of truth (Teaching) might lead you to serve in teaching ministries - preparing materials, organizing resources, or supporting teachers.",
  "Serving-Prophecy": "Your humble service (Serving) paired with bold truth (Prophecy) keeps you grounded. You speak truth but also demonstrate it through practical, behind-the-scenes work.",
  "Serving-Giving": "Both gifts are about meeting needs! Your hands-on help (Serving) combined with financial generosity (Giving) makes you incredibly effective at addressing practical needs.",
  "Serving-Exhortation": "Your practical help (Serving) combined with encouragement (Exhortation) means you both meet needs and lift spirits. You serve while inspiring others.",
  "Serving-Administration": "Your willingness to help (Serving) paired with organizational skills (Administration) makes you excellent at coordinating volunteer teams or managing ministry logistics.",
  
  "Administration-Mercy": "Your organizational skills (Administration) informed by compassion (Mercy) allow you to create structures that genuinely care for people. Your systems prioritize people's wellbeing.",
  "Administration-Teaching": "Your organizational abilities (Administration) combined with systematic truth (Teaching) make you excellent at curriculum development, educational programs, or structuring learning experiences.",
  "Administration-Prophecy": "Your vision for truth and righteousness (Prophecy) paired with organizational skills (Administration) allows you to create structures that promote godliness in the church.",
  "Administration-Giving": "Your organizational skills (Administration) combined with generosity (Giving) make you excellent at managing resources, building budgets, or organizing stewardship initiatives.",
  "Administration-Exhortation": "Your organizational abilities (Administration) paired with encouragement (Exhortation) allow you to structure ministries that help people grow while motivating teams toward goals.",
  "Administration-Serving": "Your leadership and planning (Administration) combined with willingness to serve (Serving) creates humble, effective leadership. You organize while also being willing to do whatever needs doing."
};

function SpiritualGiftsAssessment() {
  const [stage, setStage] = useState('intro'); // intro, questions, results
  const [name, setName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(70).fill(null));
  const [results, setResults] = useState(null);

  const handleAnswerSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    // Auto-advance to next question
    if (currentQuestion < 69) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 200);
    }
  };

  const calculateResults = () => {
    const scores = {};
    
    Object.keys(GIFT_MAPPING).forEach(gift => {
      const questionIndices = GIFT_MAPPING[gift];
      const total = questionIndices.reduce((sum, idx) => sum + (answers[idx] || 0), 0);
      scores[gift] = total;
    });
    
    const sortedGifts = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([gift, score]) => ({ gift, score }));
    
    setResults(sortedGifts);
    saveResults(sortedGifts);
  };

  const saveResults = async (sortedGifts) => {
    const timestamp = new Date().toISOString();
    const scores = sortedGifts.reduce((acc, item) => {
      acc[item.gift] = item.score;
      return acc;
    }, {});

    const resultData = {
      name: name.trim(),
      timestamp,
      primaryGift: sortedGifts[0]?.gift || '',
      primaryScore: sortedGifts[0]?.score || 0,
      secondaryGift: sortedGifts[1]?.gift || '',
      secondaryScore: sortedGifts[1]?.score || 0,
      tertiaryGift: sortedGifts[2]?.gift || '',
      tertiaryScore: sortedGifts[2]?.score || 0,
      scores,
      rankedGifts: sortedGifts,
      answers
    };

    try {
      const existingResults = JSON.parse(localStorage.getItem('spiritualGiftAssessments') || '[]');
      existingResults.push(resultData);
      localStorage.setItem('spiritualGiftAssessments', JSON.stringify(existingResults));
      localStorage.setItem('latestSpiritualGiftAssessment', JSON.stringify(resultData));
    } catch (error) {
      console.error('Failed to save local backup:', error);
    }

    if (!GOOGLE_SCRIPT_WEB_APP_URL || GOOGLE_SCRIPT_WEB_APP_URL.includes('PASTE_YOUR')) {
      console.warn('Google Apps Script Web App URL has not been configured.');
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(resultData)
      });
    } catch (error) {
      console.error('Failed to send results to Google Sheet:', error);
    }
  };

  const handleSubmit = () => {
    if (answers.every(a => a !== null)) {
      calculateResults();
      setStage('results');
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  const progressPercentage = ((currentQuestion + 1) / 70) * 100;
  const answeredCount = answers.filter(a => a !== null).length;

  if (stage === 'intro') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%)',
        padding: '40px 20px',
        fontFamily: "'Crimson Text', serif"
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '16px',
          padding: '60px 50px',
          boxShadow: '0 10px 40px rgba(101, 84, 62, 0.15)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #c9a871 0%, #a68a5a 100%)',
              borderRadius: '50%',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(169, 138, 90, 0.3)'
            }}>
              <Award size={40} color="white" />
            </div>
            <h1 style={{
              fontSize: '42px',
              marginBottom: '16px',
              color: '#3d3426',
              fontWeight: '600',
              lineHeight: '1.2'
            }}>
              Spiritual Gifts Assessment
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#6b5d4f',
              lineHeight: '1.6',
              fontFamily: "'Source Sans Pro', sans-serif"
            }}>
              Discover your God-given motivational gifts based on Romans 12:6-8
            </p>
          </div>

          <div style={{
            background: '#faf8f3',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '40px',
            borderLeft: '4px solid #c9a871'
          }}>
            <h2 style={{
              fontSize: '24px',
              marginBottom: '16px',
              color: '#3d3426'
            }}>
              About This Assessment
            </h2>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.7',
              color: '#4a4035',
              marginBottom: '16px',
              fontFamily: "'Source Sans Pro', sans-serif"
            }}>
              This questionnaire is based on the seven spiritual gifts mentioned in Romans 12:6-8: 
              <strong> Prophecy, Serving, Teaching, Exhortation, Giving, Administration, and Mercy</strong>.
            </p>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.7',
              color: '#4a4035',
              fontFamily: "'Source Sans Pro', sans-serif"
            }}>
              You'll answer 70 questions designed to reveal your primary, secondary, and tertiary motivational 
              gifts. Be honest and answer according to who you are now, not who you wish to be.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              fontSize: '18px',
              marginBottom: '12px',
              color: '#3d3426',
              fontWeight: '500'
            }}>
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '17px',
                border: '2px solid #e0d5c7',
                borderRadius: '8px',
                fontFamily: "'Source Sans Pro', sans-serif",
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c9a871'}
              onBlur={(e) => e.target.style.borderColor = '#e0d5c7'}
            />
          </div>

          <button
            onClick={() => name.trim() && setStage('questions')}
            disabled={!name.trim()}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '19px',
              background: name.trim() ? 'linear-gradient(135deg, #c9a871 0%, #a68a5a 100%)' : '#d4cec5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              fontWeight: '600',
              fontFamily: "'Source Sans Pro', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: name.trim() ? '0 4px 12px rgba(169, 138, 90, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (name.trim()) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(169, 138, 90, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (name.trim()) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(169, 138, 90, 0.3)';
              }
            }}
          >
            Begin Assessment
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'questions') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%)',
        padding: '40px 20px',
        fontFamily: "'Source Sans Pro', sans-serif"
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Progress Bar */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(101, 84, 62, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{ fontSize: '16px', color: '#6b5d4f', fontWeight: '500' }}>
                Question {currentQuestion + 1} of 70
              </div>
              <div style={{ fontSize: '16px', color: '#6b5d4f', fontWeight: '500' }}>
                {answeredCount}/70 answered
              </div>
            </div>
            <div style={{
              height: '8px',
              background: '#e8dcc8',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #c9a871 0%, #a68a5a 100%)',
                width: `${progressPercentage}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Question Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '50px',
            boxShadow: '0 10px 40px rgba(101, 84, 62, 0.15)',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '24px',
              lineHeight: '1.5',
              color: '#3d3426',
              marginBottom: '40px',
              fontFamily: "'Crimson Text', serif",
              fontWeight: '500'
            }}>
              {QUESTIONS[currentQuestion]}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { value: 5, label: 'Usually True' },
                { value: 3, label: 'Sometimes True' },
                { value: 1, label: 'Seldom True' },
                { value: 0, label: 'Rarely True' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  style={{
                    padding: '20px 24px',
                    fontSize: '18px',
                    background: answers[currentQuestion] === option.value 
                      ? 'linear-gradient(135deg, #c9a871 0%, #a68a5a 100%)' 
                      : '#faf8f3',
                    color: answers[currentQuestion] === option.value ? 'white' : '#3d3426',
                    border: answers[currentQuestion] === option.value 
                      ? '2px solid #a68a5a' 
                      : '2px solid #e8dcc8',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: answers[currentQuestion] === option.value ? '600' : '500',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (answers[currentQuestion] !== option.value) {
                      e.target.style.background = '#f0ebe3';
                      e.target.style.borderColor = '#c9a871';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (answers[currentQuestion] !== option.value) {
                      e.target.style.background = '#faf8f3';
                      e.target.style.borderColor = '#e8dcc8';
                    }
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              style={{
                flex: 1,
                padding: '16px',
                fontSize: '17px',
                background: currentQuestion === 0 ? '#e8dcc8' : 'white',
                color: currentQuestion === 0 ? '#a89b88' : '#3d3426',
                border: '2px solid #e8dcc8',
                borderRadius: '8px',
                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {currentQuestion < 69 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                style={{
                  flex: 1,
                  padding: '16px',
                  fontSize: '17px',
                  background: 'white',
                  color: '#3d3426',
                  border: '2px solid #e8dcc8',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#faf8f3';
                  e.target.style.borderColor = '#c9a871';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#e8dcc8';
                }}
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  padding: '16px',
                  fontSize: '17px',
                  background: answeredCount === 70 
                    ? 'linear-gradient(135deg, #c9a871 0%, #a68a5a 100%)' 
                    : '#d4cec5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: answeredCount === 70 ? 'pointer' : 'not-allowed',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  boxShadow: answeredCount === 70 ? '0 4px 12px rgba(169, 138, 90, 0.3)' : 'none'
                }}
              >
                View Results
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'results' && results) {
    const topThree = results.slice(0, 3);
    const primary = results[0];
    const secondary = results[1];
    const combinationKey = `${primary.gift}-${secondary.gift}`;
    const combinationText = PRIMARY_SECONDARY_COMBINATIONS[combinationKey];

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%)',
        padding: '40px 20px',
        fontFamily: "'Source Sans Pro', sans-serif"
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '50px',
            marginBottom: '32px',
            boxShadow: '0 10px 40px rgba(101, 84, 62, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #c9a871 0%, #a68a5a 100%)',
              borderRadius: '50%',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(169, 138, 90, 0.3)'
            }}>
              <Award size={50} color="white" />
            </div>
            <h1 style={{
              fontSize: '38px',
              marginBottom: '12px',
              color: '#3d3426',
              fontFamily: "'Crimson Text', serif",
              fontWeight: '600'
            }}>
              {name}'s Spiritual Gifts
            </h1>
            <p style={{
              fontSize: '19px',
              color: '#6b5d4f'
            }}>
              Your top three motivational gifts
            </p>
          </div>

          {/* Top Three Gifts */}
          <div style={{
            display: 'grid',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {topThree.map((item, index) => {
              const giftInfo = GIFT_DESCRIPTIONS[item.gift];
              const Icon = giftInfo.icon;
              const labels = ['Primary', 'Secondary', 'Tertiary'];
              const colors = [
                'linear-gradient(135deg, #c9a871 0%, #a68a5a 100%)',
                'linear-gradient(135deg, #a68a5a 0%, #8b7349 100%)',
                'linear-gradient(135deg, #8b7349 0%, #6d5a39 100%)'
              ];

              return (
                <div key={item.gift} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '32px',
                  boxShadow: '0 4px 20px rgba(101, 84, 62, 0.1)',
                  border: index === 0 ? '3px solid #c9a871' : 'none'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: colors[index],
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(169, 138, 90, 0.2)'
                    }}>
                      <Icon size={30} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'inline-block',
                        background: colors[index],
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {labels[index]} Gift
                      </div>
                      <h2 style={{
                        fontSize: '28px',
                        marginBottom: '8px',
                        color: '#3d3426',
                        fontFamily: "'Crimson Text', serif",
                        fontWeight: '600'
                      }}>
                        {giftInfo.title}
                      </h2>
                      <div style={{
                        fontSize: '16px',
                        color: '#6b5d4f',
                        fontWeight: '600'
                      }}>
                        Score: {item.score}/50
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '17px',
                    lineHeight: '1.7',
                    color: '#4a4035',
                    marginBottom: '20px'
                  }}>
                    {giftInfo.description}
                  </p>

                  <div style={{
                    background: '#faf8f3',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '16px'
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      marginBottom: '12px',
                      color: '#3d3426',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Key Characteristics
                    </h3>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '20px',
                      fontSize: '16px',
                      lineHeight: '1.8',
                      color: '#4a4035'
                    }}>
                      {giftInfo.characteristics.map((char, i) => (
                        <li key={i} style={{ marginBottom: '8px' }}>{char}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px'
                  }}>
                    <div style={{
                      background: '#e8f5e9',
                      borderRadius: '8px',
                      padding: '16px',
                      borderLeft: '4px solid #66bb6a'
                    }}>
                      <h4 style={{
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#2e7d32',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Strengths
                      </h4>
                      <p style={{
                        fontSize: '15px',
                        lineHeight: '1.6',
                        color: '#1b5e20',
                        margin: 0
                      }}>
                        {giftInfo.strengths}
                      </p>
                    </div>
                    <div style={{
                      background: '#fff3e0',
                      borderRadius: '8px',
                      padding: '16px',
                      borderLeft: '4px solid #ffa726'
                    }}>
                      <h4 style={{
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#e65100',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Cautions
                      </h4>
                      <p style={{
                        fontSize: '15px',
                        lineHeight: '1.6',
                        color: '#bf360c',
                        margin: 0
                      }}>
                        {giftInfo.cautions}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Primary + Secondary Combination */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(101, 84, 62, 0.15)',
            marginBottom: '32px',
            border: '3px solid #c9a871'
          }}>
            <h2 style={{
              fontSize: '28px',
              marginBottom: '20px',
              color: '#3d3426',
              fontFamily: "'Crimson Text', serif",
              fontWeight: '600',
              textAlign: 'center'
            }}>
              How Your Gifts Work Together
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #c9a871 0%, #a68a5a 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: "'Crimson Text', serif"
              }}>
                {primary.gift}
              </div>
              <span style={{ fontSize: '24px', color: '#a68a5a' }}>+</span>
              <div style={{
                background: 'linear-gradient(135deg, #a68a5a 0%, #8b7349 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: "'Crimson Text', serif"
              }}>
                {secondary.gift}
              </div>
            </div>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#4a4035',
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              {combinationText}
            </p>
          </div>

          {/* All Scores */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(101, 84, 62, 0.1)'
          }}>
            <h3 style={{
              fontSize: '22px',
              marginBottom: '24px',
              color: '#3d3426',
              fontFamily: "'Crimson Text', serif",
              fontWeight: '600'
            }}>
              Complete Score Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {results.map((item, index) => {
                const percentage = (item.score / 50) * 100;
                return (
                  <div key={item.gift}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '16px',
                        color: '#3d3426',
                        fontWeight: index < 3 ? '600' : '500'
                      }}>
                        {item.gift}
                      </span>
                      <span style={{
                        fontSize: '16px',
                        color: '#6b5d4f',
                        fontWeight: '500'
                      }}>
                        {item.score}/50
                      </span>
                    </div>
                    <div style={{
                      height: '10px',
                      background: '#f0ebe3',
                      borderRadius: '5px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        background: index < 3 
                          ? 'linear-gradient(90deg, #c9a871 0%, #a68a5a 100%)'
                          : '#c9c3b8',
                        width: `${percentage}%`,
                        transition: 'width 0.5s ease',
                        borderRadius: '5px'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '40px',
            padding: '24px',
            color: '#6b5d4f',
            fontSize: '15px'
          }}>
            <p style={{ marginBottom: '8px' }}>
              Based on Romans 12:6-8 
            </p>
            <p>
              Your results have been saved in this browser. A backend is required for administrator access across devices.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SpiritualGiftsAssessment />);

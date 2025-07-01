
# 📬 Internship Mail Bot – AI-Powered Gmail to Telegram Notifier

This project was built out of a real personal need — I often missed internship emails simply because I didn’t check my inbox regularly. To solve this, I created an automated workflow that monitors Gmail, uses AI to understand the content of unread emails, and instantly notifies me on Telegram if the message is related to internships or job opportunities.

It combines:
- 🔁 **Workflow automation**
- 🧠 **AI-powered email filtering** using Gemini 2.0 Flash
- 📲 **Real-time alerts on Telegram**


---

## ✨ Features

- 🔐 Secure Gmail access via OAuth2
- 🤖 Smart AI filtering using Gemini 2.0 Flash
- 📩 Unread emails scanned every 10 minutes
- 📲 Telegram bot notification for relevant emails
- 💬 Simple, clean architecture for customization

---

## 📁 Folder Structure

```
internship-mail-bot/
│
├── src/
│   ├── services/
│   │   ├── gmail.js           # Fetch unread emails
│   │   ├── gemini.js          # AI filtering logic (Gemini)
│   │   └── telegram.js        # Send messages to Telegram
│   │
│   └── utils/
│       └── auth.js            # Gmail OAuth2 auth
│
├── credentials.json           # Google API credentials (DO NOT PUSH)
├── token.json                 # OAuth token (auto-generated)
├── .env                       # API keys and secrets
├── .gitignore                 # Ignored files
├── index.js                   # Main runner + cron scheduler
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. 🔑 Get Gmail API Credentials

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project
- Enable **Gmail API**
- Create **OAuth client ID (Desktop app)**
- Download the file as `credentials.json`
- Place it in the project root


---

### 2. 🧠 Get Gemini API Key (Google AI Studio)

- Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
- Copy your API key (Gemini 2.0 Flash works well)

---

### 3. 🤖 Create a Telegram Bot

- Go to [@BotFather](https://t.me/botfather) on Telegram
- Run `/newbot` → give it a name → copy the bot token
- Send **any message** to your bot from your account
- Visit this URL to get your chat ID:

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

---

### 4. 🛠️ Create `.env` file

Create a `.env` in the root directory:

```
GEMINI_API_KEY=your_gemini_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

---

### 5. 📦 Install Dependencies

```bash
npm install
```

---

### 6. 🚀 Run the Bot

```bash
node index.js
```

✅ This will:
- Authenticate Gmail (you’ll be prompted in browser the first time)
- Fetch unread emails
- Use Gemini to detect internship/job emails
- Send relevant ones to your Telegram

---

### 7. 🔁 Automated Cron Job

The script automatically runs **every 10 minutes** via cron (using `node-cron`).

You can change the interval in `index.js` here:

```js
cron.schedule("*/10 * * * *", () => {
  checkForEmails();
});
```

To test faster, you can use `"*/20 * * * * *"` for every 20 seconds.

---

## 🔐 Git Ignore Recommendations

Make sure `.gitignore` includes:

```
.env
token.json
credentials.json
node_modules/
```

---

## 👨‍💻 Author

Made with 💻 and ☕ by Sameer Singh  
🔗 [LinkedIn](https://www.linkedin.com/in/sameersingh19)

---

# 🚀 SnapFix

SnapFix is a mobile-first debugging tool that converts programming error screenshots into structured, easy-to-understand fixes using AI.

Instead of manually searching errors, just capture or upload a screenshot and get instant solutions.

---

## ✨ Features

- 📷 Capture or upload error screenshots
- 🤖 AI-powered analysis
- 📄 Clean Markdown output:
  - Language
  - Error Type
  - Explanation
  - Cause
  - Fix
  - Example Code
- ⚡ Fast and focused debugging workflow

---

## 🛠 Tech Stack

- React Native (Expo)
- Expo Router
- Gemini API
- react-native-markdown-display

---

## 📂 Project Structure

```
app/
  index.js
  capture.js
  processing.js
  result.js

services/
  aiService.js

```

---

## ⚙️ Setup

```bash
npm install
```

---

## Create .env:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key
```

---

## Run app:

```bash
npx expo start
```

---

## 🧠 How It Works

- Capture / upload screenshot
- AI analyzes error
- Structured Markdown response
- Displayed in app

---

## ⚠️ Note

- Requires internet connection
- Accuracy depends on image quality

---

## 👨‍💻 Author

Abhishek Rawat

---

## 💡 Why SnapFix?

SnapFix simplifies debugging by turning error screenshots into clear, actionable fixes — reducing the need to manually search and interpret errors.

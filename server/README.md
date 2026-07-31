# 🚀 InterviewPilot AI

An AI-powered mock interview platform that analyzes a candidate's resume and conducts personalized technical interviews using Groq LLM.

## ✨ Features

- 🔐 User Authentication (JWT)
- 📄 Resume Upload (PDF)
- 🤖 AI Resume Analysis using Groq
- 🎯 Personalized Interview Questions
- 💬 Multi-turn AI Interview
- 📊 AI-generated Interview Report
- 📚 Interview History
- 📈 Dashboard with Interview Statistics

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

### AI
- Groq API
- Llama 3

---

## 📂 Project Structure

```
InterviewPilotAI/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── prompts/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Install dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 📖 Workflow

1. Register/Login
2. Upload Resume
3. Resume Analysis using Groq
4. AI Interview Generation
5. Answer Interview Questions
6. AI Report Generation
7. View Interview History

---

## 📸 Screenshots

> Add screenshots of:

- Login
- Dashboard
- Resume Upload
- Interview Setup
- AI Interview
- Report
- History

---

## 🔮 Future Improvements

- Voice-based interviews
- Webcam support
- AI follow-up questions
- Code editor for coding interviews
- Resume improvement suggestions
- Recruiter dashboard
- Interview analytics

---

## 👨‍💻 Author

**Bhumika Tiwari**

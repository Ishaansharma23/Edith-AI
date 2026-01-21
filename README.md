# 🤖 Edith-AI

Edith-AI is a **memory-powered artificial intelligence assistant** built to deliver intelligent, contextual, and personalized conversations.  
It leverages **Vector Databases (Pinecone)** to implement **short-term and long-term memory**, enabling the AI to recall relevant past interactions using semantic search.

Unlike traditional chatbots, Edith-AI remembers important information and uses it to generate more accurate and human-like responses.

---

## 🚀 Project Overview

Edith-AI is designed as a **full-stack AI application** where:
- Users can interact with an AI assistant
- Conversations maintain context
- Important information is stored and retrieved across sessions
- AI responses improve over time using memory

The system combines **LLM intelligence**, **vector embeddings**, and a **scalable backend architecture**.

---

## ✨ Features

- 🧠 Short-Term Memory (session-based context)
- 🗂️ Long-Term Memory using Pinecone Vector Database
- 🔍 Semantic search with embeddings
- 💬 Context-aware AI conversations
- 🔐 JWT-based authentication
- ⚡ Scalable backend (Node.js + Express)
- 🖥️ Clean, responsive frontend (React + Vite)

---

## 🧠 Memory System Explained

### 🔹 Short-Term Memory
- Stores recent conversation messages
- Maintains immediate context
- Exists only during active session

### 🔹 Long-Term Memory
- Stored in Pinecone Vector Database
- Uses embeddings for semantic similarity
- Retrieved across sessions
- Enables AI to remember user preferences and facts

---

## 🧬 AI + Memory Flow

```text
      User Message

            ↓
    Generate Embedding

            ↓
Short-Term Memory (Recent Context)

            ↓
  Pinecone Similarity Search

            ↓
  Relevant Long-Term Memories

            ↓
      Merged Prompt

            ↓
  AI Response Generation

            ↓
Store Important Data as Long-Term Memory

```


---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### AI & Memory
- LLM API (OpenAI or compatible)
- Pinecone Vector Database
- Embeddings for semantic search

---

## 📁 Project Structure

```text
Edith-AI/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   │   ├── pinecone.js
│   │   ├── embeddings.js
│   │   └── memory.js
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── .env
├── package.json
└── README.md
```


---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend generates JWT token
3. Token stored securely (cookies)
4. Protected routes verify token
5. Memory and conversations linked to authenticated user

---

## 🧠 Pinecone Vector Database

### Why Pinecone?
- Fast vector similarity search
- Horizontally scalable
- Ideal for AI memory systems

### What is stored?
- User messages
- Important AI responses
- Contextual embeddings
- Metadata (userId, timestamps)

### Example Metadata

```json
{
  "userId": "abc123",
  "type": "memory",
  "timestamp": "2025-01-20"
}
```

📡 API Endpoints

| Endpoint             | Method | Description                |
| -------------------- | ------ | -------------------------- |
| `/api/auth/register` | POST   | Register user              |
| `/api/auth/login`    | POST   | Login user                 |
| `/api/auth/me`       | GET    | Get current user           |
| `/api/ai/chat`       | POST   | AI conversation            |
| `/api/memory/store`  | POST   | Store long-term memory     |
| `/api/memory/search` | POST   | Retrieve relevant memories |


## 🚀 Getting Started

### ✅ Prerequisites

| Requirement | Description |
|-----------|-------------|
| Node.js | v16 or higher |
| MongoDB | Local or MongoDB Atlas |
| Pinecone | Vector database account |
| AI API Key | OpenAI / compatible LLM |

---

## ⚙️ Backend Setup

| Step | Command / Action |
|----|------------------|
| Go to backend folder | `cd backend` |
| Install dependencies | `npm install` |
| Start server | `npm run server` |

### Create `.env` file in **backend/**

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENV=your_pinecone_environment
PINECONE_INDEX=edith-ai
```
## 🖥️ Frontend Setup
| Step                  | Command       |
| --------------------- | ------------- |
| Navigate to frontend  | `cd frontend` |
| Install dependencies  | `npm install` |
| Start frontend server | `npm run dev` |

## 🌐 Application URLs

| Service     | URL                     |
| ----------- | ----------------------- |
| Frontend    | `http://localhost:5173` |
| Backend API | `http://localhost:3000` |

### 🧪 Example AI Request

| Field    | Value                                                     |
| -------- | --------------------------------------------------------- |
| Method   | POST                                                      |
| Endpoint | `/api/ai/chat`                                            |
| Body     | `{ "message": "Remember that I am learning MERN stack" }` |


## ⚙️ Deployment

| Component | Platform         |
| --------- | ---------------- |
| Frontend  | Vercel           |
| Backend   | Render / Railway |
| Database  | MongoDB Atlas    |
| Vector DB | Pinecone         |

### 🚧 Future Enhancements

| Feature               | Description                 |
| --------------------- | --------------------------- |
| Memory prioritization | Rank memories by importance |
| Emotion-aware AI      | Sentiment-based responses   |
| File ingestion        | PDFs, docs as memory        |
| Voice assistant       | Speech-based interaction    |
| Multi-user isolation  | Strict per-user memory      |


👨‍💻 Author

Ishaan Sharma
GitHub: https://github.com/Ishaansharma23

⭐ Star the repository if you found it useful!

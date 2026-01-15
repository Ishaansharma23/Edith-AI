🤖 Edith AI — Real-Time AI Chat Platform with Long-Term Memory

Edith AI is an advanced, real-time AI chat application engineered to support both short-term and long-term conversational memory. By combining vector-based embeddings with a traditional database, Edith AI delivers intelligent, context-aware conversations that persist beyond a single session.

✨ Key Features

💬 Real-Time AI Conversations
Low-latency, bi-directional messaging using Socket.IO for seamless user interaction.

🧠 Short-Term & Long-Term AI Memory

Short-Term Memory: Maintains context within active conversations.

Long-Term Memory: Stores historical interactions using vector embeddings, allowing the AI to recall relevant past conversations.

🔍 Vector-Based Context Retrieval
Relevant past messages are retrieved via semantic similarity search, enabling human-like contextual understanding.

🗂 Hybrid Database Architecture

MongoDB: Stores users, sessions, chat metadata, and structured data.

Vector Database: Stores embeddings for long-term AI memory and semantic search.

🔐 Secure Authentication & Session Management
JWT-based authentication with cookie-managed sessions, including secure login and logout functionality.

⚙️ Dynamic User Settings
Profile updates (such as name changes) are reflected instantly across the application without re-authentication.

🏗 Scalable Backend Architecture
Clean, modular backend built using Node.js & Express.js following MVC principles.

🎨 Modern & Responsive UI
Intuitive and responsive interface optimized for real-time interactions.

🧠 Memory Architecture (How Edith AI Thinks)

Edith AI uses a dual-memory system:

🟢 Short-Term Memory

Active conversation context

Used to maintain message flow and coherence

🔵 Long-Term Memory

Stored using vector embeddings

Retrieved using similarity search to recall relevant historical context

Enables continuity across sessions

This architecture allows Edith AI to behave less like a stateless chatbot and more like a persistent conversational assistant.

🛠 Tech Stack
Frontend

React.js

Tailwind CSS

Socket.IO Client

Backend

Node.js

Express.js

Socket.IO

JWT Authentication

Cookie-based Session Management

Databases & AI

MongoDB (structured data)

Vector Database (long-term memory & embeddings)

Gemini API (AI response generation)

📂 Project Structure
edith-ai/
├── client/             # React frontend
├── server/             # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── sockets/
│   └── utils/
├── .env
├── package.json
└── README.md

🔐 Authentication Flow

User logs in or registers

JWT is issued and stored securely in cookies

Session is validated on every protected request

Logout invalidates the active session

⚙️ Installation & Setup
git clone https://github.com/your-username/edith-ai.git
cd edith-ai

# Backend
cd server
npm install

# Frontend
cd ../client
npm install

Environment Variables
PORT=5000
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173

🌱 Future Enhancements

Improved long-term memory prioritization

Voice-based AI interactions

Multi-user conversations

Cloud deployment & scaling
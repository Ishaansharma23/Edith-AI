import React, { useState, useEffect, useRef } from 'react'
import {
  FaPlus, FaUser, FaPaperPlane, FaRobot,
  FaBars, FaCopy
} from 'react-icons/fa'
import axios from 'axios'
import { io } from "socket.io-client"

/* FORMATTED MESSAGE */
const FormattedMessage = ({ content, type }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (type === 'user') {
    return <div className="whitespace-pre-wrap">{content}</div>
  }

  return (
    <div className="relative group font-[Inter]">
      <pre className="whitespace-pre-wrap text-gray-100 leading-relaxed">
        {content}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
        p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-gray-300 transition"
      >
        {copied ? "✓" : <FaCopy className="text-xs" />}
      </button>
    </div>
  )
}

const TypingAnimation = () => (
  <div className="flex gap-1 px-4 py-3">
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
  </div>
)

/* MAIN COMPONENT */
const EdithAi = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [socket, setSocket] = useState(null)
  const [socketConnected, setSocketConnected] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768)
  const [isTyping, setIsTyping] = useState(false)

  const [user, setUser] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)

  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const currentChatIdRef = useRef(null)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages, isTyping])

  /* FETCH USER */
  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/me", {
      withCredentials: true
    })
      .then(res => setUser(res.data.user))
      .catch(() => {})
  }, [])

  /* LOGOUT */
  const handleLogout = () => {
    axios.post("http://localhost:3000/api/auth/logout", {}, {
      withCredentials: true
    }).then(() => {
      window.location.href = "/Login"
    })
  }

  /* FETCH CHATS */
  useEffect(() => {
    axios.get("http://localhost:3000/api/chat", {
      withCredentials: true
    })
      .then(res => setChats(res.data.chats))
      .catch(() => {})
  }, [])

  /* SOCKET */
  useEffect(() => {
    const s = io("http://localhost:3000", { withCredentials: true })

    s.on("connect", () => setSocketConnected(true))
    s.on("disconnect", () => setSocketConnected(false))

    s.on("ai-response", (res) => {
      if (res.chat !== currentChatIdRef.current) return
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        content: res.content,
        timestamp: new Date()
      }])
    })

    setSocket(s)
    return () => s.disconnect()
  }, [])

  /* SEND MESSAGE */
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || !socket || !currentChatIdRef.current) return

    const text = inputMessage.trim()

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date()
    }])

    socket.emit("ai-message", {
      chat: currentChatIdRef.current,
      content: text
    })

    setInputMessage('')
    setIsTyping(true)
  }

  /* NEW CHAT */
  const handleNewChat = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/chat",
      { title: "New Chat" },
      { withCredentials: true }
    )

    setChats(prev => [res.data.chat, ...prev])
    setMessages([])
    setIsTyping(false)

    currentChatIdRef.current = res.data.chat._id
    setCurrentChatId(res.data.chat._id)
  }

  /* SELECT CHAT */
  const selectChat = async (chatId) => {
    currentChatIdRef.current = chatId
    setCurrentChatId(chatId)
    setMessages([])
    setIsTyping(false)

    const res = await axios.get(
      `http://localhost:3000/api/chat/messages/${chatId}`,
      { withCredentials: true }
    )

    setMessages(
      res.data.messages.map(m => ({
        id: m._id,
        type: m.role === 'user' ? 'user' : 'ai',
        content: m.content,
        timestamp: new Date(m.createdAt)
      }))
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white overflow-hidden">

      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? 'w-70' : 'w-0'}
        bg-black/40 backdrop-blur-xl border-r border-cyan-500/20
        transition-all duration-300 overflow-hidden`}>

        <div className="p-4 border-b border-cyan-500/20">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-4 py-3
            bg-gradient-to-r from-cyan-600 to-blue-400
            rounded-xl font-medium hover:opacity-90"
            style={{ fontFamily: 'Inter', color: "black" }}
          >
            <FaPlus /> New Chat
          </button>
        </div>

        <div className="p-3 space-y-2">
          {chats.map(chat => (
            <div
              key={chat._id}
              onClick={() => selectChat(chat._id)}
              className={`p-3 rounded-lg cursor-pointer
              ${currentChatId === chat._id ? 'bg-cyan-500/20' : 'hover:bg-white/5'}`}
            >
              <p className="text-sm truncate">{chat.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4
          border-b border-cyan-500/20 bg-black/40 backdrop-blur">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg lg:hidden"
            >
              <FaBars />
            </button>

            <h1 className="text-xl font-extrabold tracking-wide"
              style={{ fontFamily: 'Space Grotesk' }}>
              EDITH
            </h1>

            <span className={`text-xs px-2 py-1 rounded-full
              ${socketConnected
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'}`}>
              ● {socketConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center">
                  <FaUser className="text-sm text-gray-300" />
                </div>
                <span className="text-sm">{user.fullName?.firstName}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40
                  bg-[#111] border border-white/10 rounded-xl shadow-lg z-50">
                  <button className="w-full px-4 py-2 text-left hover:bg-white/5">
                    ⚙️ Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/5"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => (
            <div key={msg.id}
              className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'ai' && (
                <div className="w-9 h-9 rounded-full
                  bg-gradient-to-br from-cyan-400 to-blue-600
                  flex items-center justify-center shadow-lg">
                  <FaRobot />
                </div>
              )}
              <div className={`max-w-3xl p-4 rounded-2xl shadow-lg
                ${msg.type === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                  : 'bg-slate-900/70 border border-cyan-500/20 backdrop-blur'}`}>
                <FormattedMessage content={msg.content} type={msg.type} />
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <FaRobot />
              </div>
              <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl">
                <TypingAnimation />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        {currentChatId && (
          <form
            onSubmit={handleSendMessage}
            className="p-5 border-t border-white/10 bg-black/40 flex gap-3 items-end"
          >
            <textarea
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Message EDITH AI..."
              rows={1}
              className="flex-1 px-4 py-3 bg-[#111] border border-white/10
              rounded-xl resize-none outline-none text-gray-100 placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="h-[50px] w-[50px] flex items-center justify-center
              rounded-xl bg-[#1a1a1a] border border-white/10
              text-cyan-400 hover:bg-[#222] hover:text-cyan-300 transition"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default EdithAi

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const HeroPage = () => {
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const fullText = "Hello, I’m Edith. How can I help you today?"

  // animation
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950
      flex items-center justify-center px-6">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-16 items-center">

        {/* Left side */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10
          rounded-3xl p-8 shadow-2xl">

          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm text-green-400">Edith AI • Online</span>
          </div>

          <div className="bg-slate-900/60 border border-cyan-500/20
            rounded-2xl p-5 text-gray-100 text-lg leading-relaxed min-h-[120px]">
            {text}
            <span className="animate-pulse">▍</span>
          </div>

          <div className="mt-4 flex gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>

        {/* RIGHT – TEXT */}
        <div className="space-y-6">

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            A smarter way to <br />
            <span className="text-transparent bg-clip-text
              bg-gradient-to-r from-cyan-400 to-blue-500">
              talk with AI
            </span>
          </h1>

          <p className="text-gray-300 max-w-md leading-relaxed">
            Edith is your intelligent AI assistant designed for natural,
            real-time conversations. Ask questions, solve problems, and explore ideas.
          </p>

          <button
            onClick={() => navigate('/register')}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl
  bg-gradient-to-r from-cyan-500 to-blue-600
  text-white font-medium
  transition-all duration-300
  hover:shadow-[0_0_25px_rgba(38,210,220,1)]
  hover:scale-[1.04]"
          >
            Get Started
            <FaArrowRight className="text-sm  transition-transform duration-300 group-hover:translate-x-1" />
          </button>

        </div>
      </div>
    </div>
  )
}

export default HeroPage

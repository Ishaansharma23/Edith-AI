import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'

const HeroPage = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/Register')
  }

  return (
    <>
      <div className="w-full h-screen relative bg-gradient-to-br from-black via-black to-blue-900 flex items-center justify-center overflow-hidden">
        
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>

        <div className="text-center px-6 max-w-8xl mx-auto relative z-10">
          
          {/* Main Headline */}
          <h1
            className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tight leading-none"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Meet{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
              Edith
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Your intelligent AI companion that understands, learns, and evolves
            with every conversation. Experience the future of AI interaction.
          </p>

          {/* Animated Get Started Button */}
          <div className="flex justify-center">
            <button
              className="animated-button w-50"
              onClick={handleGetStarted}
            >
              <div className="circle"></div>
              <FaArrowRight className="arr-2" />
              <span
                className="text text-lg tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Get Started
              </span>
              <FaArrowRight className="arr-1" />
            </button>
          </div>
        </div>

        {/* Decorative elements (blue theme) */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-sky-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-blue-500 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-cyan-300 rounded-full opacity-80 animate-pulse delay-500"></div>
      </div>
    </>
  )
}

export default HeroPage

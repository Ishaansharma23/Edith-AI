import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    const loadingToast = toast.loading('Signing you in...')

    axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email: data.email,
        password: data.password
      },
      { withCredentials: true }
    )
      .then(() => {
        toast.dismiss(loadingToast)
        toast.success('Login successful 🚀')
        navigate('/AnolaAi')
      })
      .catch((err) => {
        toast.dismiss(loadingToast)

        if (err.response?.status === 401) {
          toast.error('Invalid email or password')
        } else {
          toast.error('Server error. Please try again later')
        }
      })
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-black to-blue-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">

      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl animate-blob top-[-10%] left-[-10%]"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 bottom-[-10%] right-[-10%]"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>

      <div className="w-full max-w-md relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Edith
            </span>
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Sign in to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              <FaEnvelope />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-blue-500/30 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
              style={{ fontFamily: 'Inter, sans-serif' }}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              <FaLock />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 bg-white/10 border border-blue-500/30 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
              style={{ fontFamily: 'Inter, sans-serif' }}
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          {/* Forgot */}
          <div className="text-right">
            <button type="button" className="text-cyan-400 hover:text-cyan-300 text-sm">
              Forgot Password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/30"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Sign In
          </button>
        </form>

        {/* Register */}
        <div className="text-center mt-8">
          <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
            Don&apos;t have an account?{' '}
            <button
              onClick={() => navigate('/Register')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

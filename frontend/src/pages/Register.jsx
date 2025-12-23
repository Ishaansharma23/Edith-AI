import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FaLock, FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa"
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    const loadingToast = toast.loading('Creating your account...')

    axios.post(
      'http://localhost:3000/api/auth/register',
      {
        email: data.email,
        password: data.password,
        fullName: {
          firstName: data.firstName,
          lastName: data.lastName
        }
      },
      { withCredentials: true }
    )
      .then(() => {
        toast.dismiss(loadingToast)
        toast.success('Account created successfully 🎉')
        navigate('/Login')
      })
      .catch((err) => {
        toast.dismiss(loadingToast)

        if (err.response?.status === 409) {
          toast.error('Email already exists')
        } else {
          toast.error('Registration failed. Try again')
        }
      })
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-black to-blue-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      
      {/* moving blue glow */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl animate-blob top-[-10%] left-[-10%]"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 bottom-[-10%] right-[-10%]"></div>

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Join{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Edith
            </span>
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <InputField
            icon={<FaUser />}
            placeholder="First Name"
            register={register('firstName', { required: 'First name is required' })}
            error={errors.firstName?.message}
          />

          <InputField
            icon={<FaUser />}
            placeholder="Last Name"
            register={register('lastName', { required: 'Last name is required' })}
            error={errors.lastName?.message}
          />

          <InputField
            icon={<FaEnvelope />}
            placeholder="Email Address"
            type="email"
            register={register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />

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
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Min 6 characters required' }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/30"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Create Account
          </button>
        </form>

        {/* Login */}
        <div className="text-center mt-8">
          <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/Login')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* animation css */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,-30px) scale(1.1); }
          100% { transform: translate(0,0) scale(1); }
        }
        .animate-blob {
          animation: blob 18s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

/* reusable input */
const InputField = ({ icon, placeholder, register, error, type = 'text' }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
      {icon}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-blue-500/30 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
      style={{ fontFamily: 'Inter, sans-serif' }}
      {...register}
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
)

export default Register

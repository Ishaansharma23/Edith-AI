import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"

const Settings = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  /* FETCH CURRENT USER */
  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/me", {
      withCredentials: true
    }).then(res => {
      setForm({
        firstName: res.data.user.fullName.firstName,
        lastName: res.data.user.fullName.lastName,
        email: res.data.user.email,
        password: ""
      })
    })
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.put(
        "http://localhost:3000/api/auth/update-profile",
        form,
        { withCredentials: true }
      )
      toast.success("Profile updated successfully")
      setForm(prev => ({ ...prev, password: "" }))
    } catch {
      toast.error("Failed to update profile")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950
      flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-black/40 backdrop-blur-xl
        border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Account Settings</h2>
          <p className="text-gray-400 text-sm mt-1">
            Update your personal information
          </p>
        </div>

        {/* Name */}
        <div className="space-y-3">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <FaUser className="text-cyan-400" /> Name
          </label>

          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="input-style"
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="input-style"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <FaEnvelope className="text-cyan-400" /> Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            className="input-style"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <FaLock className="text-cyan-400" /> New Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="input-style"
          />
        </div>

        {/* Save */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold
          bg-gradient-to-r from-cyan-500 to-blue-600
          hover:from-cyan-600 hover:to-blue-700
          transition-all shadow-lg hover:shadow-cyan-500/30"
        >
          Save Changes
        </button>
      </form>

     
    </div>
  )
}

export default Settings

import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

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
    } catch {
      toast.error("Failed to update profile")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#111] p-8 rounded-2xl space-y-5"
      >
        <h2 className="text-2xl font-bold mb-4">Settings</h2>

        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl"
        />

        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 rounded-xl font-semibold hover:bg-cyan-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Settings

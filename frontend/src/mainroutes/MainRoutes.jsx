import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HeroPage from '../pages/HeroPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import EdithAi from '../pages/EdithAi'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edith" element={<EdithAi />} />
    </Routes>
  )
}

export default MainRoutes

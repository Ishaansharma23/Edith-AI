const express = require('express')
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe
} = require('../controllers/auth.controller')

const { authUser } = require('../middleware/auth.middleware')

const router = express.Router()

// public
router.post('/register', registerUser)
router.post('/login', loginUser)

// protected
router.get('/me', authUser, getMe)
router.post('/logout', authUser, logoutUser)

module.exports = router

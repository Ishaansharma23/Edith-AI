const express = require('express')
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateProfile
} = require('../controllers/auth.controller')

const { authUser } = require('../middleware/auth.middleware')

const router = express.Router()

// public
router.post('/register', registerUser)
router.post('/login', loginUser)

// ye routes protected hai sirf user jo log in kr jayega wahi access kr skta hai - protected routes hote h y 
router.get('/me', authUser, getMe) // Authuser wo btata hai ki banda logged in hai ya nhi , cookie jwt k through
// getMe logged in user ka data bhejra frontend ko jaise naam 
router.post('/logout', authUser, logoutUser)

// put isliye kyuki update kr rhe 
router.put('/update-profile', authUser, updateProfile)

module.exports = router

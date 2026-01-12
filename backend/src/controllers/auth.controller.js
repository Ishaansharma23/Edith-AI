const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Register
async function registerUser(req, res) {
  try {
    const { fullName: { firstName, lastName }, email, password } = req.body

    // finding ki email already exist krti hai ya nahi
    const isUserAlreadyExists = await userModel.findOne({ email })
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // password hash kr rhe 10 ki salt hai 
    const hashPassword = await bcrypt.hash(password, 10)

    // ye hum user create kr rhe , MongoDB me insert kar deta hai
    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password: hashPassword
    })

    // token dere , mtlb login bar bar na krna pde, “Main proof hoon ki user logged-in hai”
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )
    //Cookie = browser me store hone wala chhota data , jwt is stored in cookie &localstorage
    res.cookie("token", token, {
      httpOnly: true, // JavaScript se cookie access nahi ho sakti
      sameSite: "lax", // Dusri website se fake request me cookie nahi jaayegi
      secure: false // true when HTTPS, HTTP pe bhi cookie kaam karegi
    })

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// login wala controller
async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    })

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// GET LOGGED IN USER - jo frontend pr jara data 
async function getMe(req, res) {
  return res.status(200).json({
    user: req.user // user ka naam bhejre bs abhi 
  })
}

// profile update krna ka controller 
async function updateProfile(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body

    const user = await userModel.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (firstName) user.fullName.firstName = firstName
    if (lastName) user.fullName.lastName = lastName
    if (email) user.email = email

    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10)
    }

    await user.save()

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        email: user.email,
        fullName: user.fullName
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// logout
function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  })

  res.status(200).json({ message: "Logged out successfully" })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile, // ise export b krdia taki route m use kr sku
  logoutUser
}

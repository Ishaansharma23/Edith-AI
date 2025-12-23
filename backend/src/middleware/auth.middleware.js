const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel
      .findById(decoded.id)
      .select("-password")

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = user
    next()
  } catch (err) {
    console.error("Auth error:", err)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

module.exports = { authUser }

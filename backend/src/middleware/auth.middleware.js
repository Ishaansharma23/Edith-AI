const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

// ye user ko authorize kr rha ha ki user logged in tha ya nahi 

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token // token nikala cookie s

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    // ye tb verify krta hai ki 7 din k undr wapas websote pr jate ho to verify krta h 
    // ki user valid hai mtlb authorized hai ya nahi 
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel
      .findById(decoded.id)
      .select("-password") // Password hata diya (security) ise hata b skte

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = user //Ab poori request ke paas user ki info hai
    // Next middleware / controller use access kar sakte hain

    next() // mtlb ye kaam hogya ab middleware ka ab api  pr hit kro 
  } catch (err) {
    console.error("Auth error:", err)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

module.exports = { authUser }

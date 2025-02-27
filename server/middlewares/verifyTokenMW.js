const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token is missing or invalid" });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }
  } catch (error) {
    console.log("Error verifying token: ", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports={verifyToken}
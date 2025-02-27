const express = require("express");
const router = express.Router();
const {userVerification}=require("../middlewares/authMiddleware.js")

const {
 loginUser,getMe
} = require("../controllers/authController.js");

router.post("/", loginUser);
router.get("/me",userVerification,getMe)

module.exports = router;

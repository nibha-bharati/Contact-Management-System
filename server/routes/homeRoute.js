const express = require("express");
const router = express.Router();

const {
  userVerification
} = require("../middlewares/authMiddleware.js");

router.get("/", userVerification,(req,res)=>{
  //res.status(200).json({message:"Welcome to the home route!"})
  res.send("Hello, this is the home route!");
});

module.exports = router;
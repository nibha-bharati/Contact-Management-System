const express = require("express");
const router = express.Router();
const {userVerification}=require("../middlewares/authMiddleware.js")
const {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController.js");

router.post("/create",userVerification, createGroup);
router.get("/get",userVerification, getGroups);
router.get("/get/:id",userVerification, getGroup);
router.put("/update/:id",userVerification, updateGroup);
router.delete("/delete/:id",userVerification, deleteGroup);

module.exports = router;

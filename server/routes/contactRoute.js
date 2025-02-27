const express = require("express");
const router = express.Router();
const {userVerification}=require("../middlewares/authMiddleware.js")
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController.js");
const verifyToken=require("../middlewares/verifyTokenMW.js")

router.post("/create",userVerification, createContact);
router.get("/get",userVerification, getContacts);
router.get("/get/:id",userVerification, getContact);
router.put("/update/:id",userVerification, updateContact);
router.delete("/delete/:id",userVerification, deleteContact);

module.exports = router;

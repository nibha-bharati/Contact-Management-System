const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
  getMembersByIds,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

router.post("/create", createUser);
router.get("/get", getUsers);
router.get("/get/:id", getUser);
router.get("/getByIds",getMembersByIds);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;

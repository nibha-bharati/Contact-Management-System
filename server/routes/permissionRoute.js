const express = require("express");
const router = express.Router();

const {
  createPermission,
  getPermissions,
  getPermission,
  getPermissionsByIds,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController.js");

const {userVerification}=require("../middlewares/authMiddleware.js")

router.post("/create",userVerification, createPermission);
router.get("/get",userVerification, getPermissions);
router.get("/get/:id", userVerification,getPermission);
router.get("/getByIds",userVerification, getPermissionsByIds)
router.put("/update/:id", userVerification, updatePermission);
router.delete("/delete/:id", userVerification, deletePermission);

module.exports = router;

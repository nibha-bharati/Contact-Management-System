const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    require: true,
  },
  // permissions:[{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Permission"
  // }]
});

module.exports = new mongoose.model("Role", roleSchema);

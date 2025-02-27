const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    require: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

module.exports = new mongoose.model("Group", groupSchema);

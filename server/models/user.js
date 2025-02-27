const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  // permissions:[
  //   {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Permission"
  //   }
  // ]
});

userSchema.pre("save",async function () {
  this.password=await bcrypt.hash(this.password,12);
})

module.exports = new mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
  },
  nickname: {
    type: String,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  workinfo: {
    type: String,
  },
  address: {
    type: String,
  },
  importantDates: {
    type: Map,
    of: Date,
    default: {},
  },
  relationship: {
    type: String,
  },
  notes: {
    type: String,
  },
  website: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = new mongoose.model("Contact", contactSchema);

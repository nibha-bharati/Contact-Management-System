const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    permissionName:{
        type: String,
        unique: true
    }
});

module.exports = new mongoose.model("Permission", permissionSchema);

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, role) => {
 
  return jwt.sign({ id, role }, process.env.TOKEN_KEY, {
    expiresIn: "30d",
  });
};

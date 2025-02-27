const User = require("../models/user");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.json({ message: "Incorrect password or email" });
//     }

//     const auth = await bcrypt.compare(password, user.password);

//     if (!auth) {
//       return res.json({ message: "Incorrect password" });
//     }
//     const token = createSecretToken(user._id);
//     res.json(token)
//     // console.log("Set token: ",token)
//     // // res.cookie("token", token, {
//     // //   withCredentials: true,
//     // //   httpOnly: false,
//     // //   sameSite: "None",
//     // // });
//     // localStorage.setItem("token",token)

//     // res
//     //   .status(201)
//     //   .json({ message: "User logged in successfully", success: true });
//   } catch (error) {
//     console.log(error);
//   }
// };

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    
    res.json({ user, token: createSecretToken(user._id, user.role) });
  } else {
    res.status(400);
    // throw new Error('Invalid credentials')
  }
};

const getMe = async (req, res) => {
  const { _id, firstname, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    firstname,
    email,
  });
};
module.exports = { loginUser, getMe };

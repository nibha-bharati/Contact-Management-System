const User = require("../models/user");
const { use } = require("../routes/userRoute");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    const user = await User.create(req.body);
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ _id: user._id, firstname: user.firstname, email: user.email,token: createSecretToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMembersByIds = async (req, res) => {
  const { memberIds } = req.query;
  const ids = memberIds.split(",");
  try {
    const members = await User.find({ _id: { $in: ids } });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    const updatedUser = await User.findById(id);
    res.send(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getMembersByIds,
  updateUser,
  deleteUser,
};

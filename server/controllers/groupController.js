const Group = require("../models/group");
const User=require("../models/user")

const createGroup = async (req, res) => {
  try {
  
    const group = await Group.create(req.body);
    const memberIds=req.body.members
    await User.updateMany(
      {_id:{$in:memberIds}},
      {$push:{groups: group._id}}
    )
    res.send(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.send(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroup= async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    res.send(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGroup= async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findByIdAndUpdate(id, req.body);

    if (!group) {
      res.status(404).json({ message: "Group not found!" });
    }

    const updatedGroup = await Group.findById(id);
    res.send(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findByIdAndDelete(id);

    if (!group) {
      res.status(404).json({ message: "Group not found!" });
    }

    res.status(200).json({ message: "Group deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
};

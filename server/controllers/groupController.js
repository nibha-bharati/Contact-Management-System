const Group = require("../models/group");
const User = require("../models/user");

const createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    const memberIds = req.body.members;
    await User.updateMany(
      { _id: { $in: memberIds } },
      { $push: { groups: group._id } }
    );
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

const getGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    res.send(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    //console.log("Request received");

    const group = await Group.findByIdAndUpdate(id, req.body);
    const memberIds = req.body.members;

    if (!group) {
      res.status(404).json({ message: "Group not found!" });
    }

    await Promise.all(
      memberIds.map(async (memberId) => {
        // console.log("Entered promise.all");
        const user = await User.findById(memberId);
        //console.log(user.groups);
        // if (user.groups.includes(group._id)) {
        //   console.log(`${user._id} already contains ${group._id}`);
        // }
        if (user && !user.groups.includes(group._id)) {
          await User.updateOne(
            { _id: memberId },
            { $push: { groups: group._id } }
          );
        }
      })
    );

    const allUsersInGroup = await User.find({ groups: group._id });
    await Promise.all(
      allUsersInGroup.map(async (user) => {
        if (!memberIds.includes(user._id.toString())) {
          await User.updateOne(
            { _id: user._id },
            { $pull: { groups: group._id } }
          );
        }
      })
    );

    // await User.updateMany(
    //   { _id: { $in: memberIds } },
    //   { $push: { groups: group._id } }
    // );

    const updatedGroup = await Group.findById(id);
    res.send(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    const memberIds = group.members;
    memberIds.map(async (memberId)=>{
      const user = await User.findById(memberId);
      await User.updateOne(
        {_id: user._id},
        {$pull: {groups: group._id}}
      )
    })
    const deletedGroup = await Group.findByIdAndDelete(id);

    if (!group) {
      res.status(404).json({ message: "Group not found!" });
    }
    //console.log(deletedGroup);

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

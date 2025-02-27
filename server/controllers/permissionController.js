const Permission = require("../models/permission");

const createPermission = async (req, res) => {
  try {
    const permission = await Permission.create(req.body);
    res.send(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({});
    res.send(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);
    res.send(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPermissionsByIds = async (req, res) => {
  // console.log("hi");
  const { permissionIds } = req.query;
  // console.log(req.query);
  // console.log(permissionIds);
  const ids = permissionIds.split(",");
  console.log(ids);
  try {
    console.log("yay");
    // const objectIds = ids.map((id) => mongoose.Types.ObjectId(id));
    // const objectIds = ids.map((id) => {
    //   console.log(id);
    //   return mongoose.Types.ObjectId(id)
    // });
    const permissions = [];
    for (let i = 0; i < ids.length; i++) {
      permissions.push(await Permission.findById(ids[i]));
    }
    console.log(permissions);
    // console.log(objectIds);
    // const permissions = await Permission.find({ _id: { $in: ids } });
    // console.log(hi2);
    // console.log(permissions);
 
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByIdAndUpdate(id, req.body);

    if (!permission) {
      res.status(404).json({ message: "Permission not found!" });
    }

    const updatedPermission = await Permission.findById(id);
    res.send(updatedPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByIdAndDelete(id);

    if (!permission) {
      res.status(404).json({ message: "Permission not found!" });
    }

    res.status(200).json({ message: "Permission deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPermission,
  getPermissions,
  getPermission,
  getPermissionsByIds,
  updatePermission,
  deletePermission,
};

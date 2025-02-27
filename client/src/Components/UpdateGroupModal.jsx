import { useEffect, useState } from "react";
import axios from "axios";
import "./modal.css";

const UpdateGroupModal = ({
  group,
  permissionNames,
  memberNames,
  onClose,
  onUpdateSuccess,
}) => {
  const [updatedGroup, setUpdatedGroup] = useState({
    groupName: "",
    permissions: [],
    members: [],
  });

  const [showPermissions, setShowPermissions] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState(updatedGroup.members);
  const [selectedPermissions, setSelectedPermissions] = useState(updatedGroup.permissions);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (group) {
      setUpdatedGroup({
        groupName: group.groupName,
        permissions: group.permissions,
        members: group.members,
      });
      setSelectedUsers(group.members);
      setSelectedPermissions(group.permissions);
    }

    // Fetch users and permissions when modal is opened
    axios
      .get("http://localhost:5000/user/get",{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setUsers(result.data))
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get("http://localhost:5000/permission/get",{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setPermissions(result.data))
      .catch((error) => console.error("Error fetching permissions:", error));
  }, [group]);

  const handleChange = (e) => {
    setUpdatedGroup((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUserCheckbox = (e) => {
    const { value, checked } = e.target;
    setSelectedUsers((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  const handlePermissionCheckbox = (e) => {
    const { value, checked } = e.target;
    setSelectedPermissions((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const updatedGroupData = {
        groupName: updatedGroup.groupName,
        permissions: selectedPermissions,
        members: selectedUsers,
      };
      const response = await axios.put(
        `http://localhost:5000/group/update/${group._id}`,
        updatedGroupData,{
            headers: { Authorization: `Bearer ${token}` },
          }
      );

      onUpdateSuccess(response.data); // Update list after successful update
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  // Map selected users and permissions to their names
  const getSelectedUsers = (selectedIds) => {
    return selectedIds.map((id) => {
      const user = users.find((user) => user._id === id);
      return user ? `${user.firstname} ${user.lastname}` : "Unknown member";
    });
  };

  const getSelectedPermissions = (selectedIds) => {
    return selectedIds.map((id) => {
      const permission = permissions.find((permission) => permission._id === id);
      return permission ? permission.permissionName : "Unknown permission";
    });
  };

  return (
    <div className="modal">
      <h2>Update Group</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name:
        </label>
        <input
          type="text"
          name="groupName"
          value={updatedGroup.groupName}
          onChange={handleChange}
        />

        <div>
          <button type="button" onClick={() => setShowMembers(!showMembers)}>
            {showMembers ? "Hide Members" : "Add/Delete Members"}
          </button>
          {showMembers && (
            <div>
              <ul>
                {users.map((user) => (
                  <li key={user._id}>
                    <label>
                      <input
                        type="checkbox"
                        value={user._id}
                        checked={selectedUsers.includes(user._id)}
                        onChange={handleUserCheckbox}
                      />
                      {user.firstname} {user.lastname}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <button type="button" onClick={() => setShowPermissions(!showPermissions)}>
            {showPermissions ? "Hide Permissions" : "Add/Delete Permissions"}
          </button>
          {showPermissions && (
            <div>
              <ul>
                {permissions.map((permission) => (
                  <li key={permission._id}>
                    <label>
                      <input
                        type="checkbox"
                        value={permission._id}
                        checked={selectedPermissions.includes(permission._id)}
                        onChange={handlePermissionCheckbox}
                      />
                      {permission.permissionName}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>


        <button
          className=" mt-10 mr-5 text-black inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Update
        </button>

        <button
          className="text-black inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateGroupModal;

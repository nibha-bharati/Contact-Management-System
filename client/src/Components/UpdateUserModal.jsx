import { useEffect, useState } from "react";
import axios from "axios";
import "./modal.css";
import { getUserPermissions } from "../Utilities/getPermissionNames";

const UpdateUserModal = ({ userObj, onClose, onUpdateSuccess }) => {
  const [updatedUser, setUpdatedUser] = useState({
    firstname: "",
    lastname: "",
  });
  const [permissions, setPermissions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  useEffect(
    () => {
      if (userObj) {
        setUpdatedUser({
          firstname: userObj.firstname,
          lastname: userObj.lastname,
        });
      }
      getUserPermissions(userId)
        .then((permissionNames) => {
          setPermissions(permissionNames);
        })
        .catch((error) => {
          console.error("Error fetching permissions:", error);
        });
    },
    [userObj],
    [userId]
  );

  const handleChange = (e) => {
    setUpdatedUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
   // console.log(permissions);
    if (
      permissions.indexOf("updateUsers") != -1) {
      try {
        const response = await axios.put(
          `http://localhost:5000/user/update/${userObj._id}`,

          updatedUser,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        onUpdateSuccess(response.data); // Update list after successful update
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      alert("You do not have the required permission!");
    }
  };

  return (
    <div className="modal">
      <h2>Update User</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First name:
        </label>

        <input
          type="text"
          name="firstname"
          value={updatedUser.firstname}
          onChange={handleChange}
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last name:
        </label>

        <input
          type="text"
          name="lastname"
          value={updatedUser.lastname}
          onChange={handleChange}
        />

        <br />
        <button
          className="text-black inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default UpdateUserModal;

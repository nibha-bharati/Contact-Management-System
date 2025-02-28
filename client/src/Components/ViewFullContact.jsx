import { useEffect, useState } from "react";
import axios from "axios";
import "./modal.css";
import { getUserPermissions } from "../Utilities/getPermissionNames";

const ViewContactModal = ({ contact, onClose, onUpdateSuccess }) => {
  const [updatedContact, setUpdatedContact] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [permissions, setPermissions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  useEffect(
    () => {
      if (contact) {
        setUpdatedContact({
          firstname: contact.firstname,
          lastname: contact.lastname,
          email: contact.email,
          nickname: contact.nickname,
          phone: contact.phone,
          workinfo: contact.workinfo,
          address: contact.address,
          notes: contact.notes,
          website: contact.website
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
    [contact],
    [userId]
  );

  const handleChange = (e) => {
    setUpdatedContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    console.log(permissions);
    if (
      permissions.indexOf("updateSelfContact") != -1 ||
      permissions.indexOf("updateOthersContact") != -1
    ) {
      try {
        const response = await axios.put(
          `http://localhost:5000/contact/update/${contact._id}`,

          updatedContact,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        onUpdateSuccess(response.data); // Update list after successful update
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      alert("You do not have the required permission!");
    }
  };

  return (
    <div className="modal">
      <h2>Update Contact</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name:
        </label>

        <input
          type="text"
          name="firstname"
          value={updatedContact.firstname + " " + updatedContact.lastname}
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email:
        </label>

        <input type="email" name="email" value={updatedContact.email} />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
         Nickname:
        </label>

        <input type="text" name="nickname" value={updatedContact.nickname} />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
         Phone number:
        </label>

        <input type="text" name="phone" value={updatedContact.phone} />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
         Work Info:
        </label>

        <input type="text" name="workinfo" value={updatedContact.workinfo} />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Address:
        </label>

        <input type="text" name="address" value={updatedContact.address} />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Notes:
        </label>

        <input type="text" name="notes" value={updatedContact.notes} />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
         Website:
        </label>

        <input type="text" name="website" value={updatedContact.website} />

        <br />
        {/* <button
          className="text-black inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Update
        </button> */}

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

export default ViewContactModal;

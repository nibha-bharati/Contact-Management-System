import { useEffect, useState } from "react";
import axios from "axios";
import "./modal.css";
import { getUserPermissions } from "../Utilities/getPermissionNames";

const UpdateModal = ({ contact, onClose, onUpdateSuccess }) => {
  const [updatedContact, setUpdatedContact] = useState({
    firstname: "",
    lastname:"",
    email: "",
  });
  const [permissions, setPermissions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  useEffect(() => {
    if (contact) {
      setUpdatedContact({ firstname: contact.firstname, lastname: contact.lastname, email: contact.email });
    }
    getUserPermissions(userId)
    .then((permissionNames) => {
      setPermissions(permissionNames);
    })
    .catch((error) => {
      console.error("Error fetching permissions:", error);
    });
  }, [contact],[userId]);

  const handleChange = (e) => {
    setUpdatedContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    console.log(permissions)
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
          value={updatedContact.firstname+" "+updatedContact.lastname}
          onChange={handleChange}
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email:
        </label>

        <input
          type="email"
          name="email"
          value={updatedContact.email}
          onChange={handleChange}
        />
        <br/>
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

export default UpdateModal;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const UpdateModal = ({ contact, onClose, onUpdateSuccess }) => {
//   const [updatedContact, setUpdatedContact] = useState({
//     firstname: "",
//     email: "",
//   });

//   // Prefill the modal fields with existing contact details
//   useEffect(() => {
//     if (contact) {
//       setUpdatedContact({
//         firstname: contact.firstname || "", // Ensure it’s not undefined
//         email: contact.email || "",
//       });
//     }
//   }, [contact]);

//   const handleChange = (e) => {
//     setUpdatedContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         "http://localhost:5000/contact/update/${contact._id}",
//         updatedContact
//       );
//       onUpdateSuccess(response.data); // Update UI after successful update
//       onClose(); // Close the modal after update
//     } catch (error) {
//       console.error("Error updating contact:", error);
//     }
//   };

//   return (
//     <>
//       {/* Toggle Button */}
//       <button
//         data-modal-target="crud-modal"
//         data-modal-toggle="crud-modal"
//         className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         type="button"
//       >
//         Update Contact
//       </button>

//       {/* Modal */}
//       <div
//         id="crud-modal"
//         tabIndex="-1"
//         aria-hidden="true"
//         className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//       >
//         <div className="relative p-4 w-full max-w-md max-h-full">
//           {/* Modal Content */}
//           <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Update Contact
//               </h3>
//               <button
//                 type="button"
//                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                 data-modal-toggle="crud-modal"
//                 onClick={onClose}
//               >
//                 <svg
//                   className="w-3 h-3"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 14 14"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                   />
//                 </svg>
//                 <span className="sr-only">Close modal</span>
//               </button>
//             </div>

//             {/* Modal Body */}
//             <form className="p-4 md:p-5" onSubmit={handleSubmit}>
//               <div className="grid gap-4 mb-4 grid-cols-2">
//                 {/* Name Field */}
//                 <div className="col-span-2">
//                   <label
//                     htmlFor="firstname"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstname"
//                     id="firstname"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                     placeholder="Enter name"
//                     value={updatedContact.firstname}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Email Field */}
//                 <div className="col-span-2">
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                     placeholder="Enter email"
//                     value={updatedContact.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Update Contact
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UpdateModal;

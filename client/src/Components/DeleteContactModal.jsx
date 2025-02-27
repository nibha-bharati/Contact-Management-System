import React from 'react';
import "./modal.css";  // You can reuse the styles or modify them as needed

const DeleteModal = ({ onClose, onConfirm, contact }) => {
  return (
    <div className="modal">
      <h2>Are you sure you want to delete this contact?</h2>
      <p>{contact.firstname} {contact.lastname}</p>
      <p>{contact.email}</p>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onConfirm}
          className="text-black inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Yes, Delete
        </button>
        <button
          onClick={onClose}
          className="text-black inline-flex items-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;

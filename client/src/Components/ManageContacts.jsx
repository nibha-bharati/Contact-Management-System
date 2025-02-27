import axios from "axios";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import ContactForm from "./ContactForm";
import UpdateModal from "./UpdateContactModal";
import DeleteModal from "./DeleteContactModal";
import { getUserPermissions } from "../Utilities/getPermissionNames";
import UserSidebar from "./UserSidebar";

export default function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  useEffect(() => {
    getUserPermissions(userId)
      .then((permissionNames) => {
        setPermissions(permissionNames);
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
      });
  }, [userId]);

  const viewContacts = (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    if (
      permissions.indexOf("getSelfContact") != -1 ||
      permissions.indexOf("getOthersContact") != -1
    ) {
      axios
        .get("http://localhost:5000/contact/get", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log(result);
          setContacts(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("You do not have the required permission!");
    }
  };

  const updateContact = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const openDeleteModal = (contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const deleteContact = async () => {
    const token = localStorage.getItem("authToken");
    if (
      permissions.indexOf("deleteSelfContact") != -1 ||
      permissions.indexOf("deleteOthersContact") != -1
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/contact/delete/${selectedContact._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setContacts((prevContacts) =>
          prevContacts.filter((c) => c._id !== selectedContact._id)
        );
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    } else {
      alert("You do not have the required permission!");
    }
  };

  return (
    <>
      <div className="grid">
        <div className="row-start-1 col-span-1">
         {user.role=='admin'?( <AdminSidebar />):(<UserSidebar/>)}
        </div>
        <div className="row-start-1 col-span-2">
          <button onClick={viewContacts} className="mt-20 mb-20">
            View contacts
          </button>
          <div>
            {contacts.length > 0 ? (
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {contacts.map((item) => (
                  <li key={item._id} className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src="/docs/images/people/profile-picture-1.jpg"
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item.firstname} {item.lastname}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {item.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {item.phone}
                      </div>
                      <button onClick={() => updateContact(item)}>
                        <ion-icon name="create"></ion-icon>
                      </button>
                      <button onClick={() => openDeleteModal(item)}>
                        <ion-icon name="trash"></ion-icon>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row-start-1 col-span-2">
          <ContactForm />
        </div>
      </div>
      {isModalOpen && (
        <UpdateModal
          contact={selectedContact}
          onClose={() => setIsModalOpen(false)}
          onUpdateSuccess={(updatedContact) => {
            setContacts((prevContacts) =>
              prevContacts.map((c) =>
                c._id === updatedContact._id ? updatedContact : c
              )
            );
            setIsModalOpen(false);
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          contact={selectedContact}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={deleteContact} // Delete the contact on confirmation
        />
      )}
    </>
  );
}

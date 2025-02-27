import axios from "axios";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import ContactForm from "./ContactForm";
import UpdateModal from "./UpdateContactModal";
import DeleteModal from "./DeleteContactModal";
import { getUserPermissions } from "../Utilities/getPermissionNames";
import UserSidebar from "./UserSidebar";
import Header from "./Header";

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
      <Header />
      <div className="grid">
        <div className="row-start-1 col-span-1">
          {user.role == "admin" ? <AdminSidebar /> : <UserSidebar />}
        </div>
        <div className="row-start-1 col-span-2">
          <button onClick={viewContacts} className="mt-20 mb-20">
            View contacts
          </button>
          <div
            id="viewContactsBox"
            className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs"
          >
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              {contacts.length > 0 ? (
                <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4 grid grid-cols-5 gap-4 p-3 even:bg-gray-50">
                    <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>Profile</strong>
                      </p>
                    </div>
                    <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>Name</strong>
                      </p>
                    </div>
                    <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>Email</strong>
                      </p>
                    </div>
                    <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                      <p className="text-sm font-medium text-gray-900 dark:text-white ml-5">
                        <strong>Phone</strong>
                      </p>
                    </div>
                    {/* <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>Edit</strong>
                      </p>
                    </div>
                    <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>Del</strong>
                      </p>
                    </div> */}
                  </li>
                  {contacts.map((item) => (
                    <li
                      key={item._id}
                      className="pb-3 sm:pb-4 grid grid-cols-5 gap-4 p-3 even:bg-gray-50"
                    >
                      <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                        <div className="shrink-0">
                          <img
                            className="w-12 h-12 rounded-full"
                            src="/docs/images/people/profile-picture-1.jpg"
                            alt="Profile"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.firstname} {item.lastname}
                        </p>
                      </div>

                      <div className="flex items-center justify-start text-sm text-gray-500 dark:text-gray-400">
                        {item.email}
                      </div>

                      <div className="inline-flex items-center justify-center text-base font-semibold text-gray-900 dark:text-white">
                        {item.phone}
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={() => updateContact(item)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <ion-icon name="create"></ion-icon>
                        </button>
                        <button
                          onClick={() => openDeleteModal(item)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <ion-icon name="trash"></ion-icon>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </dl>
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

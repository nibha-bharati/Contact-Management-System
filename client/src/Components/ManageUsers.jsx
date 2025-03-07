import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";
import Header from "./Header";
import { getUserPermissions } from "../Utilities/getPermissionNames";
import UpdateUserModal from "./UpdateUserModal";
import DeleteUserModal from "./DeleteUserModal";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const viewUsers = (e) => {
    e.preventDefault();
    if (permissions.indexOf("getUsers") != -1) {
      console.log("yes getting users");
      axios
        .get("http://localhost:5000/user/get")
        .then((result) => {
          //console.log(result);
          setUsers(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("You do not have the required permission!");
    }
  };

  const updateUser = (userObj) => {
    setSelectedUser(userObj);
    setIsUserModalOpen(true);
  };

  const openDeleteModal = (userObj) => {
    setSelectedUser(userObj);
    setIsDeleteModalOpen(true);
  };

  const deleteUser = async () => {
    const token = localStorage.getItem("authToken");
    if (permissions.indexOf("deleteUsers") != -1) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/user/delete/${selectedUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers((prevUsers) =>
          prevUsers.filter((c) => c._id !== selectedUser._id)
        );
        setIsDeleteModalOpen(false);
      } catch (err) {
        console.log("Error deleting user!");
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
        <div className="row-start-1 col-span-4">
          <button
            onClick={viewUsers}
            className="mt-8 mb-8 px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600 transition duration-200"
          >
            View Users
          </button>

          <div
            id="viewUsersBox"
            className="flow-root rounded-lg border border-white py-3 "
          >
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              {users.length > 0 ? (
                <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4 grid grid-cols-4 gap-4 p-3 even:bg-gray-50">
                    {/* <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>Profile</strong>
                      </p>
                    </div> */}
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
                    {/* <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                      <p className="text-sm font-medium text-gray-900 dark:text-white ml-5">
                        <strong>Phone</strong>
                      </p>
                    </div> */}
                  </li>
                  {users.map((item) => (
                    <li
                      key={item._id}
                      className="pb-3 sm:pb-4 grid grid-cols-5 gap-4 p-3 even:bg-gray-50"
                    >
                      {/* <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                        <button onClick={() => viewContactInfo(item)}>
                          View
                        </button>
                      </div> */}

                      <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.firstname}{" "}
                          {item.lastname == undefined ? "" : item.lastname}
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
                          onClick={() => updateUser(item)}
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

          {isUserModalOpen && (
            <UpdateUserModal
              userObj={selectedUser}
              onClose={() => setIsUserModalOpen(false)}
              onUpdateSuccess={(updatedUser) => {
                setUsers((prevUsers) =>
                  prevUsers.map((c) =>
                    c._id === updatedUser._id ? updatedUser : c
                  )
                );
                setIsUserModalOpen(false);
              }}
            />
          )}

          {isDeleteModalOpen && (
            <DeleteUserModal
              userObj={selectedUser}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={deleteUser}
            />
          )}
          {/* <div className="flow-root rounded-lg border border-white py-3 ">
            {users.length > 0 ? (
              <ul className="max-w-3xl divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((item) => (
                  <li
                    key={item._id}
                    className="pb-3 sm:pb-4 grid grid-cols-3 gap-4 p-3 even:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item.firstname} {item.lastname}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {item.email}
                        </p>
                      </div>
                    </div>
                    
                  </li>
                ))}
              </ul>
            ) : (
            ''
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}

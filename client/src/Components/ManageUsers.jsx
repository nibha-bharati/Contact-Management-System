import { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";
import Header from "./Header";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const viewUsers = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/user/get")
      .then((result) => {
        console.log(result);
        setUsers(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <div className="flow-root rounded-lg border border-white py-3 ">
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
          </div>
        </div>
      </div>
    </>
  );
}

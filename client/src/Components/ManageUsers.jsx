import { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";

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
      <div className="grid">
        <div className="row-start-1 col-span-1">
          {user.role=='admin'?( <AdminSidebar />):(<UserSidebar/>)}
         
        </div>
        <div className="row-start-1 col-span-4">
          <button onClick={viewUsers} className="mt-20 mb-20">
            View users
          </button>
          <div>
            {users.length > 0 ? (
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((item) => (
                  <li key={item._id} className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
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
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

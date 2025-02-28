import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="w-100">
      <div className="flex h-screen flex-col justify-between border-e border-gray-100 bg-white">
        <div className="px-4 py-6">
      
          <ul className="mt-6 space-y-1">
            <li>
              <Link
                to="/manageUsers"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Manage Users
              </Link>
            </li>

            <li>
              <Link
                to="/manageGroups"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Manage Groups
              </Link>
            </li>

            <li>
              <Link
                to="/manageContacts"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Manage Contacts
              </Link>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div className="flex">
              <p className="text-xs">
                <strong className="block font-medium">
                  {user?.firstname || "FirstName"}{" "}
                  {user?.lastname || "LastName"}
                </strong>

                <span>{user?.email || "user@example.com"}</span>
              </p>
             
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPermissions } from "../Utilities/getPermissionNames";


export default function createGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState();
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const viewUsers = (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    axios
      .get("http://localhost:5000/user/get",{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result);
        setUsers(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewPermissions = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:5000/permission/get",{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result);
        setPermissions(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");    

    if (!groupName) {
      alert("Group name cannot be empty!");
    } else {
      axios
        .post(
          "http://localhost:5000/group/create",
          {
            groupName: groupName,
            members: selectedUsers,
            permissions: selectedPermissions
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          console.log(result);
          navigate("/manageGroups");
          window.location.reload()
        })
        .catch((e) => console.log("Error occured: ", e));
    }
  };

  const handleUserCheckbox = (e) => {
    const { value, checked } = e.target;
    setSelectedUsers((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  const handlePermissionCheckbox = (e) => {
    const { value, checked } = e.target;
    setSelectedPermissions((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  return (
    <>
      <form className="max-w-sm mx-auto mt-20">
        <div className="mb-5">
          <label
            htmlFor="groupName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter group name
          </label>
          <input
            type="text"
            id="groupName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <button onClick={viewUsers} className="mb-5">
          Assign group to users
        </button>
        {users.length > 0 ? (
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((item) => (
              <li key={item._id} className="pb-3 sm:pb-4">
                <label
                  htmlFor="Option1"
                  className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                >
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded-sm border-gray-300"
                      id="Option1"
                      value={item._id}
                      onChange={handleUserCheckbox}
                    />
                  </div>

                  <div>
                    <strong className="font-medium text-gray-900">
                      {" "}
                      {item.firstname} {item.lastname}{" "}
                    </strong>

                    <p className="mt-1 text-sm text-pretty text-gray-700">
                      {item.email}
                    </p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}

        <button onClick={viewPermissions} className="mb-5">
          Assign permissions to group
        </button>
        {permissions.length > 0 ? (
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {permissions.map((item) => (
              <li key={item._id} className="pb-3 sm:pb-4">
                <label
                  htmlFor="Option1"
                  className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                >
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded-sm border-gray-300"
                      id="Option1"
                      value={item._id}
                      onChange={handlePermissionCheckbox}
                    />
                  </div>

                  <div>
                    <strong className="font-medium text-gray-900">
                      {" "}
                      {item.permissionName}{" "}
                    </strong>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}

        <button
          onClick={onSubmitHandler}
          type="submit"
          className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create new group
        </button>
      </form>
    </>
  );
}

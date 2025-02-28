import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { useState } from "react";
import CreateGroupForm from "./CreateGroupForm";
import UpdateGroupModal from "./UpdateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import Header from "./Header";

export default function ManageGroups() {
  const [groups, setGroups] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const viewGroups = (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    axios
      .get("http://localhost:5000/group/get", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result);
        setGroups(result.data);

        const permissionIds = result.data.flatMap((group) => group.permissions);
        const memberIds = result.data.flatMap((group) => group.members);
        fetchPermissions(permissionIds);
        fetchMembers(memberIds);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateGroup = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const openDeleteModal = (group) => {
    setSelectedGroup(group);
    setIsDeleteModalOpen(true);
  };

  const deleteGroup = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.delete(
        `http://localhost:5000/group/delete/${selectedGroup._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGroups((prevGroups) =>
        prevGroups.filter((c) => c._id !== selectedGroup._id)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };
  const fetchPermissions = (permissionIds) => {
    console.log("Permission ids:", permissionIds);
    const token = localStorage.getItem("authToken");
    if (permissionIds.length === 0) return;

    axios
      .get("http://localhost:5000/permission/getByIds", {
        params: { permissionIds: permissionIds.join(",") },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        console.log("Response: ", response.data);
        setPermissions(response.data);
      })
      .catch((error) => {
        console.log("errorrrrr");
        console.log(error);
      });
  };

  const fetchMembers = (memberIds) => {
    const token = localStorage.getItem("authToken");
    if (memberIds.length === 0) return; // If no members to fetch, return early

    axios
      .get(
        "http://localhost:5000/user/getByIds",
        {
          params: { memberIds: memberIds.join(",") },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setMembers(response.data); // Store member names
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPermissionNames = (permissionIds) => {
    console.log("hi");
    return permissionIds
      .map((id) => {
        const permission = permissions.find((perm) => perm._id === id);
        console.log("Permission: ".permission);
        return permission ? permission.permissionName : "Unknown Permission";
      })
      .join(", ");
  };

  const getMemberNames = (memberIds) => {
    return memberIds
      .map((id) => {
        const member = members.find((memb) => memb._id === id);
        return member
          ? member.firstname + " " + member.lastname
          : "Unknown member";
      })
      .join(", ");
  };

  return (
    <>
    <Header/>
      <div className="grid">
        <div className="row-start-1 col-span-1">
          <AdminSidebar />
        </div>
        <div className="row-start-1 col-span-4">
          <button onClick={viewGroups} className="mt-20 mb-20">
            View groups
          </button>

          <div
            id="viewGroupBox"
            className="flow-root rounded-lg border border-white py-3"
          >
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              {groups.length > 0 ? (
                <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4 grid grid-cols-5 gap-4 p-3 even:bg-gray-50">
                    <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>Group Name</strong>
                      </p>
                    </div>
                    <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>Permissions</strong>
                      </p>
                    </div>
                    <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>Members</strong>
                      </p>
                    </div>
                    <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                      <p className="text-sm font-medium text-gray-900 dark:text-white ml-20">
                        <strong>Edit</strong>
                      </p>
                    </div>
                    <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                      <p className="text-sm font-medium text-gray-900 dark:text-white ml-20">
                        <strong>Delete</strong>
                      </p>
                    </div>
                  </li>
                  
                  {groups.map((item) => (
                    <li
                      key={item._id}
                      className="pb-3 sm:pb-4 grid grid-cols-5 gap-4 p-3 even:bg-gray-50"
                    >
                      <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.groupName}
                        </p>
                      </div>

                      <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                        {getPermissionNames(item.permissions)}
                      </div>

                      <div className="flex items-center justify-start text-base font-semibold text-gray-900 dark:text-white">
                        {getMemberNames(item.members)}
                      </div>

                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => updateGroup(item)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <ion-icon name="create"></ion-icon>
                        </button>
                      </div>

                      <div className="flex items-center justify-center">
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
        <div className="row-start-1 col-span-4">
          <CreateGroupForm />
        </div>
      </div>
      {isModalOpen && (
        <UpdateGroupModal
          group={selectedGroup}
          permissionNames={permissions}
          memberNames={members}
          onClose={() => setIsModalOpen(false)}
          onUpdateSuccess={(updatedGroup) => {
            setGroups((prevGroups) =>
              prevGroups.map((c) =>
                c._id === updatedGroup._id ? updatedGroup : c
              )
            );
            setIsModalOpen(false);
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteGroupModal
          group={selectedGroup}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={deleteGroup} // Delete the group on confirmation
        />
      )}
    </>
  );
}

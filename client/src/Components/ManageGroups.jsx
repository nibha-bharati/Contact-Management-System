import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { useState } from "react";
import CreateGroupForm from "./CreateGroupForm";
import UpdateGroupModal from "./UpdateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";

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

        const permissionIds = result.data.flatMap((group) => group.permissions); // Extract all permission IDs
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
    const token = localStorage.getItem("authToken");
    if (permissionIds.length === 0) return; // If no permissions to fetch, return early

    axios
      .get("http://localhost:5000/permission/getByIds", {
        params: { permissionIds: permissionIds.join(",") },
      },{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPermissions(response.data); // Store permission names
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMembers = (memberIds) => {
    const token = localStorage.getItem("authToken");
    if (memberIds.length === 0) return; // If no members to fetch, return early

    axios
      .get("http://localhost:5000/user/getByIds", {
        params: { memberIds: memberIds.join(",") },
      },{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMembers(response.data); // Store member names
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPermissionNames = (permissionIds) => {
    return permissionIds
      .map((id) => {
        const permission = permissions.find((perm) => perm._id === id);
        console.log(permission)
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
      <div className="grid">
        <div className="row-start-1 col-span-1">
          <AdminSidebar />
        </div>
        <div className="row-start-1 col-span-4">
          <button onClick={viewGroups} className="mt-20 mb-20">
            View groups
          </button>
          <div>
            {groups.length > 0 ? (
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {groups.map((item) => (
                  <li key={item._id} className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white ">
                          {item.groupName}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white ml-30">
                        {getPermissionNames(item.permissions)}
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white ml-30">
                        {getMemberNames(item.members)}
                      </div>
                      <button onClick={() => updateGroup(item)}>
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

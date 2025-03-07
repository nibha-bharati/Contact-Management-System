import axios from "axios";

export const getUserPermissions = (userId) => {
  const token = localStorage.getItem("authToken");

  return axios
    .get(`http://localhost:5000/user/get/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((userResponse) => {
      const user = userResponse.data;
      const groupIds = user.groups;

      const groupPermissionPromises = groupIds.map((groupId) => {
        return axios
          .get(`http://localhost:5000/group/get/${groupId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((groupResponse) => {
            const group = groupResponse.data;
          
            return group.permissions;
          });
      });
      return Promise.all(groupPermissionPromises)
        .then((allPermissionIds) => {
          const allPermissionIdsFlat = [].concat(...allPermissionIds);
          //console.log("all ", allPermissionIdsFlat);
          const uniquePermissionIds = [
            ...new Set(allPermissionIdsFlat.filter(Boolean)),
          ];

          if (uniquePermissionIds.length > 0) {
            
            return axios
              .get("http://localhost:5000/permission/getByIds", {
                params: { permissionIds: uniquePermissionIds.join(",") },
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((permissionResponse) => {
                const permissions = permissionResponse.data;
                const permissionNames = permissions.map(
                  (permission) => permission.permissionName
                );
                
                return permissionNames;
              });
          } else {
            console.log("No permissions assigned to this user.");
            return [];
          }
        })
        .catch((error) => {
          console.error("Error fetching group data:", error);
          return [];
        });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      return [];
    });
};

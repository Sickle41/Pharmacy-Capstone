const _apiUrl = "/api/userprofile";

export const getUserProfiles = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const updatePassword = async (currentPassword, newPassword) => {
    const response = await fetch("/api/userprofile/updatepassword", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ currentPassword: currentPassword, newPassword: newPassword })
    });
    return response.status === 204;
};

export const getUserProfilesWithRoles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

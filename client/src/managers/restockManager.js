import * as authManager from './authManager';

const _apiUrl = "/api/restocklog";

export const recentRestocks = () => {
    return fetch (_apiUrl + "/RecentRestock")
        .then((res) => res.json())
        .then((data) => {
            console.log("Restocks Data:", data);
            return data;
        });
}

export const getRestocks = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const deleteRestock = (restock) => {
    return fetch(`${_apiUrl}/${restock.id}`, {
        method: "DELETE",
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.status; // Return the status code for success
    });
};

export const addRestock = (restock) => {
  return authManager.tryGetLoggedInUser()
    .then(user => {
      if (user) {
        restock.userProfileId = user.id; // Add the user ID to the restock object
        return fetch(_apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restock),
        });
      } else {
        // Handle the case where the user is not logged in
        return Promise.reject("User not logged in");
      }
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    });
};

export const updateRestock = (restock) => {
    return fetch(`${_apiUrl}/${restock.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(restock),
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        if (res.status === 204) {
            return null; // Or return undefined;
        }
        return res.json(); // Return the JSON response for success
    });
};
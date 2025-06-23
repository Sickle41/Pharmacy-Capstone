const _apiUrl = "/api/supplier";

export const getSuppliers = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const getSupplierById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
}

export const deleteSupplier = (supplier) => {
    return fetch(`${_apiUrl}/${supplier.id}`, {
        method: "DELETE",
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.status; // Return the status code for success
    });
};

import * as authManager from './authManager';

export const addSupplier = (supplier) => {
  return authManager.tryGetLoggedInUser()
    .then(user => {
      if (user) {
        supplier.userProfileId = user.id; // Add the user ID to the supplier object
        return fetch(_apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(supplier),
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

export const updateSupplier = (supplier) => {
    return fetch(`${_apiUrl}/${supplier.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
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
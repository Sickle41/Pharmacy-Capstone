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

export const addSupplier = (supplier) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
    }).then((res) => {
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
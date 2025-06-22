const _apiUrl = "/api/medication";

export const getMedications = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const expiringSoonMedications = () => {
    return fetch(_apiUrl + "/ExpiringNextMonth").then((res) => res.json());
}

export const updateMedication = (medication) => {
    return fetch(`${_apiUrl}/${medication.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(medication),
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Return the JSON response for success
    });
};

export const getMedicationById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const deleteMedication = (medication) => {
    return fetch(`${_apiUrl}/${medication.id}`, {
        method: "DELETE",
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.status; // Return the status code for success
    });
};

export const addMedication = (medication) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(medication),
    }).then((res) => res.json());
};
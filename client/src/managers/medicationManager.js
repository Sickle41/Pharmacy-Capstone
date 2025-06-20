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
        return res.status; // Return the status code for success
    });
};
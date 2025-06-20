const _apiUrl = "/api/medication";

export const getMedications = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const expiringSoonMedications = () => {
    return fetch(_apiUrl + "/ExpiringNextMonth").then((res) => res.json());
}
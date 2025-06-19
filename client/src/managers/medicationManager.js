const _apiUrl = "/api/medication";

export const getMedications = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const expiringMedications = () => {
    return fetch(_apiUrl + "/ExpiringNextMonth").then((res) => res.json());
}
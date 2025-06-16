const _apiUrl = "/api/medication";

export const getMedications = () => {
    return fetch(_apiUrl).then((res) => res.json())
}
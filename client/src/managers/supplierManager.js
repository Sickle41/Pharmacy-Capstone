const _apiUrl = "/api/supplier";

export const getSuppliers = () => {
    return fetch(_apiUrl).then((res) => res.json());
}
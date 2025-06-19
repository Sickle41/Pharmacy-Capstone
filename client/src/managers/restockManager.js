const _apiUrl = "/api/restocklog";

export const recentRestocks = () => {
    return fetch (_apiUrl + "/RecentRestock").then((res) => res.json());
}
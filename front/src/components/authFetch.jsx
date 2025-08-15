export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("token");
            window.location.reload();
            throw new Error("Session expired. Please log in again.");
        }
        throw new Error("Request failed");
    }
    return res.json();
};
export const auth = {
    Authorization: `Bearer ${window.user ? window.user.token : ''}`
};
export const headersWithAuth = { ...auth };
export const args = { headers };

export const authHeaders = {
    Authorization: `Bearer ${window.user ? window.user.token : ''}`
};
export const headers = { ...authHeaders };
export const args = { headers };

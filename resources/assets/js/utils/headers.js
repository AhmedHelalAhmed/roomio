export const auth = {
  Authorization: `Bearer ${window.user ? window.user.token : ''}`,
};

export const headersWithAuth = { headers: { ...auth } };

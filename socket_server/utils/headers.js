module.exports = {
  makeHeaders(token) {
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    console.log('token was null');
    return {};
  },
};

const axios = require('axios');
const Promise = require('bluebird');

const authAxios = {
  authPOST: (url, token, data, args = {}) => {
    const headers = { Authorization: `Bearer ${token}` };
    const reqArgs = Object.assign({}, args, { headers });
    return new Promise((resolve, reject) => {
      axios.post(url, data, reqArgs)
        .then(resolve)
        .catch(reject);
    });
  },
  authGET: (url, token, args) => {
    const headers = { Authorization: `Bearer ${token}` };
    const reqArgs = Object.assign({}, args, { headers });
    return new Promise((resolve, reject) => {
      axios.get(url, reqArgs)
        .then(resolve)
        .catch(reject);
    });
  },
};

module.exports = authAxios;

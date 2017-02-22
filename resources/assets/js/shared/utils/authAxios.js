import axios from 'axios';
import { auth } from '../constants/headers';

export const authPOST = (url, data, args = {}) => {
  const headers = { ...auth };
  const reqArgs = { headers, ...args };
  return new Promise((resolve, reject) => {
    axios.post(url, data, reqArgs)
      .then(resolve)
      .catch(reject);
  });
};

export const authGET = (url, args) => {
  const headers = { ...auth };
  const reqArgs = { headers, ...args };
  return new Promise((resolve, reject) => {
    axios.get(url, reqArgs)
      .then(resolve)
      .catch(reject);
  });
};

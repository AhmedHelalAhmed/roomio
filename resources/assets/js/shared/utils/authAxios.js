import axios from 'axios';
import { auth } from '../constants/headers';

export const authPOST = (url, data, args = {}) => {
  const headers = { ...auth };
  const reqArgs = { headers, ...args };
  return axios.post(url, data, reqArgs)
};

export const authGET = (url, args) => {
  const headers = { ...auth };
  const reqArgs = { headers, ...args };
  return axios.get(url, reqArgs)
};

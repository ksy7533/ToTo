import axios from 'axios';
import router from '../router';

const DOMAIN = 'http://localhost:8001';
const UNAUTHORIZED = 401;

const onUnauthorized = () => {
  router.push('/login');
};

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  }).then(result => result.data).catch((result) => {
    const { status } = result.response;
    if (status === UNAUTHORIZED) return onUnauthorized();
    throw Error(result);
  });
};

export const auth = {
  login(email, password) {
    return request('post', '/auth/login', {
      email,
      password,
    });
  },

  logout() {
    return request('get', '/auth/logout');
  },
};
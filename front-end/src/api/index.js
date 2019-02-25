import axios from 'axios';
import router from '../router';

const DOMAIN = 'http://localhost:8001';
const UNAUTHORIZED = 401;

const onUnauthorized = () => {
  router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`);
};

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  }).then((result) => {
    return result.data;
  })
    .catch(({ response }) => {
      const { status } = response;
      if (status === UNAUTHORIZED) return onUnauthorized();
      throw Error(response);
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

  join(email, password, nick) {
    return request('post', '/auth/join', {
      email,
      password,
      nick,
    });
  },
};

export const setAuthInHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
};

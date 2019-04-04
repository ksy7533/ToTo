import { request } from './index';

export default {
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


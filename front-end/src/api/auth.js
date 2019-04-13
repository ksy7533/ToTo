import { request } from './index';

export default {
  login(email, password) {
    return request({
      method: 'post',
      url: '/api/auth/login',
      data: {
        email,
        password,
      },
    });
  },

  logout() {
    return request({
      method: 'get',
      url: '/api/auth/logout',
    });
  },

  join(email, password, nick) {
    return request({
      method: 'post',
      url: '/api/auth/join',
      data: {
        email,
        password,
        nick,
      },
    });
  },
};


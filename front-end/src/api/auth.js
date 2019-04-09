import { request } from './index';

export default {
  login(email, password) {
    return request({
      method: 'post',
      url: '/auth/login',
      data: {
        email,
        password,
      },
    });
  },

  logout() {
    return request({
      method: 'get',
      url: '/auth/logout',
    });
  },

  join(email, password, nick) {
    return request({
      method: 'post',
      url: '/auth/join',
      data: {
        email,
        password,
        nick,
      },
    });
  },
};


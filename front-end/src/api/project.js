import { request } from './index';

export default {
  fetchOne(id) {
    return request({
      method: 'get',
      url: `/projects/${id}`,
    });
  },

  fetchAll() {
    return request({
      method: 'get',
      url: '/projects',
    });
  },

  create(title) {
    return request({
      method: 'post',
      url: '/projects',
      data: { title },
    });
  },

  delete(id) {
    return request({
      method: 'delete',
      url: `/projects/${id}`,
    });
  },
};


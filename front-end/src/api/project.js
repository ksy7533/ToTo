import { request } from './index';

export default {
  fetchOne(id) {
    return request({
      method: 'get',
      url: `/api/projects/${id}`,
    });
  },

  fetchAll() {
    return request({
      method: 'get',
      url: '/api/projects',
    });
  },

  create(title) {
    return request({
      method: 'post',
      url: '/api/projects',
      data: { title },
    });
  },

  delete(id) {
    return request({
      method: 'delete',
      url: `/api/projects/${id}`,
    });
  },
};


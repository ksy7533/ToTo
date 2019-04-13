import { request } from './index';

export default {
  fetchOne(id) {
    return request({
      method: 'get',
      url: `/api/problems/${id}`,
    });
  },

  fetchAll(pid) {
    return request({
      method: 'get',
      url: `/api/problems/project/${pid}`,
    });
  },

  create(title, pid) {
    return request({
      method: 'post',
      url: '/api/problems',
      data: { title, pid },
    });
  },

  update(id, payload) {
    return request({
      method: 'put',
      url: `/api/problems/${id}`,
      data: payload,
    });
  },

  delete(id) {
    return request({
      method: 'delete',
      url: `/api/problems/${id}`,
    });
  },
};


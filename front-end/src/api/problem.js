import { request } from './index';

export default {
  fetchOne(id) {
    return request({
      method: 'get',
      url: `/problems/${id}`,
    });
  },

  fetchAll(pid) {
    return request({
      method: 'get',
      url: `/problems/project/${pid}`,
    });
  },

  create(title, pid) {
    return request({
      method: 'post',
      url: '/problems',
      data: { title, pid },
    });
  },

  update(id, payload) {
    return request({
      method: 'put',
      url: `/problems/${id}`,
      data: payload,
    });
  },

  delete(id) {
    return request({
      method: 'delete',
      url: `/problems/${id}`,
    });
  },
};


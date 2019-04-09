import { request } from './index';

export default {
  fetchOne(id) {
    return request({
      method: 'get',
      url: `/todos/${id}`,
    });
  },

  fetchAll(pid) {
    return request({
      method: 'get',
      url: `/todos/project/${pid}`,
    });
  },

  create(title, pid) {
    return request({
      method: 'post',
      url: '/todos',
      data: { title, pid },
    });
  },

  update(id, payload) {
    return request({
      method: 'put',
      url: `/todos/${id}`,
      data: payload,
    });
  },

  delete(id) {
    return request({
      method: 'delete',
      url: `/todos/${id}`,
    });
  },
};


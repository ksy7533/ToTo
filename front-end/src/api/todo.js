import { request } from './index';

export default {
  fetchOne(id) {
    return request({
      method: 'get',
      url: `/api/todos/${id}`,
    });
  },

  fetchAll(pid) {
    return request({
      method: 'get',
      url: `/api/todos/project/${pid}`,
    });
  },

  create(title, pid) {
    return request({
      method: 'post',
      url: '/api/todos',
      data: { title, pid },
    });
  },

  update(id, payload) {
    return request({
      method: 'put',
      url: `/api/todos/${id}`,
      data: payload,
    });
  },

  delete(id) {
    return request({
      method: 'delete',
      url: `/api/todos/${id}`,
    });
  },
};


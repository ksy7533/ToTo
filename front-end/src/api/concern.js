import { request } from './index';

export default {
  fetchOne(id) {
    return request({
      method: 'get',
      url: `/api/concerns/${id}`,
    });
  },

  fetchAll(pid) {
    return request({
      method: 'get',
      url: `/api/concerns/project/${pid}`,
    });
  },

  create(title, pid) {
    return request({
      method: 'post',
      url: '/api/concerns',
      data: { title, pid },
    });
  },

  update(id, payload) {
    return request({
      method: 'put',
      url: `/api/concerns/${id}`,
      data: payload,
    });
  },

  delete(id) {
    return request({
      method: 'delete',
      url: `/api/concerns/${id}`,
    });
  },
};


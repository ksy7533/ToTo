import { request } from './index';

export default {
  fetchOne(id) {
    return request({
      method: 'get',
      url: `/concerns/${id}`,
    });
  },

  fetchAll(pid) {
    return request({
      method: 'get',
      url: `/concerns/project/${pid}`,
    });
  },

  create(title, pid) {
    return request({
      method: 'post',
      url: '/concerns',
      data: { title, pid },
    });
  },

  update(id, payload) {
    return request({
      method: 'put',
      url: `/concerns/${id}`,
      data: payload,
    });
  },

  delete(id) {
    return request({
      method: 'delete',
      url: `/concerns/${id}`,
    });
  },
};


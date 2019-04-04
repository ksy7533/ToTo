import { request } from './index';

export default {
  fetch({ id, pid }) {
    return id ? request('get', `/concerns/${id}`) : request('get', `/concerns/project/${pid}`);
  },

  create(title, pid) {
    return request('post', '/concerns', { title, pid });
  },

  update(id, payload) {
    return request('put', `/concerns/${id}`, payload);
  },

  destory(id, payload) {
    return request('delete', `/concerns/${id}`, payload);
  },
};


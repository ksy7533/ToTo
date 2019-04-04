import { request } from './index';

export default {
  fetch({ id, pid }) {
    return id ? request('get', `/problems/${id}`) : request('get', `/problems/project/${pid}`);
  },

  create(title, pid) {
    return request('post', '/problems', { title, pid });
  },

  update(id, payload) {
    return request('put', `/problems/${id}`, payload);
  },

  destory(id, payload) {
    return request('delete', `/problems/${id}`, payload);
  },
};


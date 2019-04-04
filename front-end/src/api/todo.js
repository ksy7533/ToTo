import { request } from './index';

export default {
  fetch({ id, pid }) {
    return id ? request('get', `/todos/${id}`) : request('get', `/todos/project/${pid}`);
  },

  create(title, pid) {
    return request('post', '/todos', { title, pid });
  },

  update(id, payload) {
    return request('put', `/todos/${id}`, payload);
  },

  destory(id, payload) {
    return request('delete', `/todos/${id}`, payload);
  },
};


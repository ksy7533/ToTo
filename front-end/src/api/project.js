import { request } from './index';

export default {
  fetch(id) {
    return id ? request('get', `/projects/${id}`) : request('get', '/projects');
  },

  fetchCalendar(id, payload) {
    return request('post', `/projects/${id}/calendar`, payload);
  },

  create(title) {
    return request('post', '/projects', { title });
  },

  destory(id) {
    return request('delete', `/projects/${id}`);
  },
};


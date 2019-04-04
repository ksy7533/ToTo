import { request } from './index';

export default {
  fetchCalendar(pid, payload) {
    return request('post', `/works/${pid}/calendar`, payload);
  },

  fetchIncomplete(pid) {
    return request('get', `/works/${pid}/incomplete`);
  },
};


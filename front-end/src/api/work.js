import { request } from './index';

export default {
  fetchCalendar(payload) {
    return request({
      method: 'get',
      url: '/works/calendar',
      params: payload,
    });
  },

  fetchIncomplete(pid) {
    return request({
      method: 'get',
      url: `/works/${pid}/incomplete`,
    });
  },
};

import { request } from './index';

export default {
  fetchCalendar({ pid, duration }) {
    return request({
      method: 'get',
      url: `/works/${pid}/calendar`,
      params: duration,
    });
  },

  fetchIncomplete(pid) {
    return request({
      method: 'get',
      url: `/works/${pid}/incomplete`,
    });
  },
};

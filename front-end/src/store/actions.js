import * as api from '../api';

const actions = {
  FETCH_WORK_CALENDAR(_, payload) {
    return api.work.fetchCalendar(payload)
      .then(data => data.result);
  },

  FETCH_WORKS_INCOMPLETE(_, { pid }) {
    return api.work.fetchIncomplete(pid)
      .then(data => data.result);
  },
};

export default actions;

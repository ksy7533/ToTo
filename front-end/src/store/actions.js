import * as api from '../api';

const actions = {
  LOGIN({ commit }, { email, password }) {
    return api.auth.login(email, password)
      .then(({ accessToken }) => {
        commit('LOGIN', accessToken);
      });
  },

  JOIN(_, { email, password, nick }) {
    return api.auth.join(email, password, nick);
  },

  FETCH_PROJECTS({ commit }) {
    return api.project.fetch()
      .then((data) => {
        commit('SET_PROJECTS', data.result);
      });
  },

  FETCH_PROJECT({ commit }, { id }) {
    return api.project.fetch(id)
      .then((data) => {
        commit('SET_PROJECT', data.result);
      });
  },

  ADD_PROJECT({ dispatch }, { title }) {
    return api.project.create(title)
      .then(() => {
        dispatch('FETCH_PROJECTS');
      });
  },

  DELETE_PROJECT({ dispatch }, { id }) {
    return api.project.destory(id)
      .then(() => {
        dispatch('FETCH_PROJECTS');
      });
  },

  FETCH_TODOS({ commit }, { pid }) {
    return api.todo.fetch({ pid })
      .then((data) => {
        commit('SET_TASKS', data.result);
      });
  },

  FETCH_TODO(_, { id }) {
    return api.todo.fetch({ id });
  },

  FETCH_TODO_INCOMPLETE(_, { pid }) {
    return api.todo.fetchIncomplete({ pid })
      .then(data => data.result);
  },

  ADD_TODO({ dispatch }, { title, pid }) {
    return api.todo.create(title, pid)
      .then((data) => {
        dispatch('FETCH_TODOS', { pid });
        return data;
      });
  },

  UPDATE_TODO({ dispatch, state }, { id, payload }) {
    return api.todo.update(id, payload)
      .then(() => {
        dispatch('FETCH_TODOS', { pid: state.projectId });
      });
  },

  DELETE_TODO({ dispatch, state }, { id }) {
    return api.todo.destory(id, {
      pid: state.projectId,
    })
      .then(() => {
        dispatch('FETCH_TODOS', { pid: state.projectId });
      });
  },

  FETCH_PROBLEMS({ commit }, { pid }) {
    return api.problem.fetch({ pid })
      .then((data) => {
        commit('SET_TASKS', data.result);
      });
  },

  FETCH_PROBLEM(_, { id }) {
    return api.problem.fetch({ id });
  },

  ADD_PROBLEM({ dispatch }, { title, pid }) {
    return api.problem.create(title, pid)
      .then((data) => {
        dispatch('FETCH_PROBLEMS', { pid });
        return data;
      });
  },

  UPDATE_PROBLEM({ dispatch, state }, { id, payload }) {
    return api.problem.update(id, payload)
      .then(() => {
        dispatch('FETCH_PROBLEMS', { pid: state.projectId });
      });
  },

  DELETE_PROBLEM({ dispatch, state }, { id }) {
    return api.problem.destory(id, {
      pid: state.projectId,
    })
      .then(() => {
        dispatch('FETCH_PROBLEMS', { pid: state.projectId });
      });
  },

  FETCH_CONCERNS({ commit }, { pid }) {
    return api.concern.fetch({ pid })
      .then((data) => {
        commit('SET_TASKS', data.result);
      });
  },

  FETCH_CONCERN(_, { id }) {
    return api.concern.fetch({ id });
  },

  ADD_CONCERN({ dispatch }, { title, pid }) {
    return api.concern.create(title, pid)
      .then((data) => {
        dispatch('FETCH_CONCERNS', { pid });
        return data;
      });
  },

  UPDATE_CONCERN({ dispatch, state }, { id, payload }) {
    return api.concern.update(id, payload)
      .then(() => {
        dispatch('FETCH_CONCERNS', { pid: state.projectId });
      });
  },

  DELETE_CONCERN({ dispatch, state }, { id }) {
    return api.concern.destory(id, {
      pid: state.projectId,
    })
      .then(() => {
        dispatch('FETCH_CONCERNS', { pid: state.projectId });
      });
  },

  FETCH_CALENDAR({ state }, { startDateOfMonth, endDateOfMonth }) {
    return api.calendar.fetch(
      state.projectId,
      startDateOfMonth,
      endDateOfMonth,
    );
  },
};

export default actions;

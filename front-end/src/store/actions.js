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

  FETCH_TODOS({ commit }, { pid }) {
    return api.todo.fetch({ pid })
      .then((data) => {
        commit('SET_TASKS', data.result);
      });
  },

  FETCH_TODO(_, { id }) {
    return api.todo.fetch({ id });
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
        dispatch('FETCH_TODOS', { pid: state.project.id });
      });
  },

  DELETE_TODO({ dispatch, state }, { id }) {
    return api.todo.destory(id, {
      pid: state.project.id,
    })
      .then(() => {
        dispatch('FETCH_TODOS', { pid: state.project.id });
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
        dispatch('FETCH_PROBLEMS', { pid: state.project.id });
      });
  },
};

export default actions;

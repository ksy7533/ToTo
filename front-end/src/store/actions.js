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

  // FETCH_PROJECTS({ commit }, { title }) {
  // },

  ADD_TODO({ dispatch }, { title, pid }) {
    return api.todo.create(title, pid)
      .then(() => {
      });
  },
};

export default actions;

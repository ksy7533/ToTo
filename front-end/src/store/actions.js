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

  ADD_PROJECT({ dispatch }, { title }) {
    return api.project.create(title)
      .then(() => {
        dispatch('FETCH_PROJECTS');
      });
  },
};

export default actions;

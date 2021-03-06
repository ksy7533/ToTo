import * as api from '../../api';

export default {
  namespaced: true,
  state: {
    token: null, // 유저 토큰 정보
    user: null, // 유저 정보
  },

  mutations: {
    LOGIN(state, token) {
      if (!token) return;
      state.token = token;
      localStorage.setItem('token', token);
      api.setAuthInHeader(token);
    },
    LOGOUT(state) {
      state.token = null;
      delete localStorage.token;
      api.setAuthInHeader(null);
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },

  actions: {
    LOGIN({ commit }, { email, password }) {
      return api.auth.login(email, password)
        .then(({ accessToken }) => {
          commit('LOGIN', accessToken);
        });
    },
    JOIN(_, { email, password, nick }) {
      return api.auth.join(email, password, nick);
    },
    FETCH_USER({ commit }) {
      return api.auth.fetchUser()
        .then(({ result }) => {
          commit('SET_USER', result);
        });
    },
  },
};

import * as api from '../api';

const actions = {
  LOGIN({ commit }, { email, password }) {
    return api.auth.login(email, password)
      .then(({ accessToken }) => {
        commit('LOGIN', accessToken);
      });
  },

  JOIN({ commit }, { email, password, nick }) {
    console.log(email)
    return api.auth.join(email, password, nick)
  },
};

export default actions;

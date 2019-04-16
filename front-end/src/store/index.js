import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';

import projectStore from './modules/projectStore';
import taskStore from './modules/taskStore';
import userStore from './modules/userStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,

  modules: {
    projectStore,
    taskStore,
    userStore,
  },
});

const { token } = localStorage;
store.commit('userStore/LOGIN', token);

export default store;

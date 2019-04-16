import * as api from '../../api';

export default {
  namespaced: true,
  state: {
    tasks: [], // 현재 선택된 tasks
  },

  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
  },

  actions: {
    FETCH_TODOS({ commit }, { pid }) {
      return api.todo.fetchAll(pid)
        .then((data) => {
          commit('SET_TASKS', data.result);
        });
    },
    FETCH_TODO(_, { id }) {
      return api.todo.fetchOne(id);
    },
    ADD_TODO({ dispatch }, { title, pid }) {
      return api.todo.create(title, pid)
        .then((data) => {
          dispatch('FETCH_TODOS', { pid });
          return data;
        });
    },
    UPDATE_TODO({ dispatch, rootState }, { id, payload }) {
      return api.todo.update(id, payload)
        .then(() => {
          dispatch('FETCH_TODOS', { pid: rootState.projectStore.projectId });
        });
    },
    DELETE_TODO({ dispatch, rootState }, { id }) {
      return api.todo.delete(id)
        .then(() => {
          dispatch('FETCH_TODOS', { pid: rootState.projectStore.projectId });
        });
    },
    FETCH_PROBLEMS({ commit }, { pid }) {
      return api.problem.fetchAll(pid)
        .then((data) => {
          commit('SET_TASKS', data.result);
        });
    },
    FETCH_PROBLEM(_, { id }) {
      return api.problem.fetchOne(id);
    },
    ADD_PROBLEM({ dispatch }, { title, pid }) {
      return api.problem.create(title, pid)
        .then((data) => {
          dispatch('FETCH_PROBLEMS', { pid });
          return data;
        });
    },
    UPDATE_PROBLEM({ dispatch, rootState }, { id, payload }) {
      return api.problem.update(id, payload)
        .then(() => {
          dispatch('FETCH_PROBLEMS', { pid: rootState.projectStore.projectId });
        });
    },
    DELETE_PROBLEM({ dispatch, rootState }, { id }) {
      return api.problem.delete(id)
        .then(() => {
          dispatch('FETCH_PROBLEMS', { pid: rootState.projectStore.projectId });
        });
    },
    FETCH_CONCERNS({ commit }, { pid }) {
      return api.concern.fetchAll(pid)
        .then((data) => {
          commit('SET_TASKS', data.result);
        });
    },
    FETCH_CONCERN(_, { id }) {
      return api.concern.fetchOne(id);
    },
    ADD_CONCERN({ dispatch }, { title, pid }) {
      return api.concern.create(title, pid)
        .then((data) => {
          dispatch('FETCH_CONCERNS', { pid });
          return data;
        });
    },
    UPDATE_CONCERN({ dispatch, rootState }, { id, payload }) {
      return api.concern.update(id, payload)
        .then(() => {
          dispatch('FETCH_CONCERNS', { pid: rootState.projectStore.projectId });
        });
    },
    DELETE_CONCERN({ dispatch, rootState }, { id }) {
      return api.concern.delete(id)
        .then(() => {
          dispatch('FETCH_CONCERNS', { pid: rootState.projectStore.projectId });
        });
    },
  },
};

import * as api from '../../api';

export default {
  namespaced: true,
  state: {
    projects: [], // 모든 project
    project: null, // 현재 선택된 project
    projectId: '', // 현재 선택된 project id
  },

  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_PROJECT(state, project) {
      state.project = project;
    },
    SET_PROJECT_ID(state, id) {
      state.projectId = id;
    },
  },

  actions: {
    FETCH_PROJECTS({ commit }) {
      return api.project.fetchAll()
        .then((data) => {
          commit('SET_PROJECTS', data.result);
        });
    },
    FETCH_PROJECT({ commit }, { id }) {
      return api.project.fetchOne(id)
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
      return api.project.delete(id)
        .then(() => {
          dispatch('FETCH_PROJECTS');
        });
    },
  },
};

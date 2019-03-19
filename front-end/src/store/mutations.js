import { setAuthInHeader } from '../api';

const mutations = {
  LOGIN(state, token) {
    if (!token) return;
    state.token = token;
    localStorage.setItem('token', token);
    setAuthInHeader(token);
  },

  LOGOUT(state) {
    state.token = null;
    delete localStorage.token;
    setAuthInHeader(null);
  },

  SET_PROJECTS(state, projects) {
    state.projects = projects;
  },

  SET_PROJECT(state, project) {
    state.project = project;
  },

  SET_PROJECT_ID(state, id) {
    state.projectId = id;
  },

  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
};

export default mutations;

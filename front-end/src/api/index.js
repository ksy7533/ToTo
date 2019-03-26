import axios from 'axios';
import router from '../router';

const DOMAIN = 'http://localhost:8001';
const UNAUTHORIZED = 401;

const onUnauthorized = () => {
  router.push(`/auth/login?returnPath=${encodeURIComponent(location.pathname)}`);
};

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  }).then(result => result.data)
    .catch(({ response }) => {
      const { status } = response;
      if (status === UNAUTHORIZED) return onUnauthorized();
      throw Error(response);
    });
};

export const auth = {
  login(email, password) {
    return request('post', '/auth/login', {
      email,
      password,
    });
  },

  logout() {
    return request('get', '/auth/logout');
  },

  join(email, password, nick) {
    return request('post', '/auth/join', {
      email,
      password,
      nick,
    });
  },
};

export const project = {
  fetch(id) {
    return id ? request('get', `/projects/${id}`) : request('get', '/projects');
  },

  create(title) {
    return request('post', '/projects', { title });
  },

  destory(id) {
    return request('delete', `/projects/${id}`);
  },
};

export const todo = {
  fetch({ id, pid }) {
    return id ? request('get', `/todos/${id}`) : request('get', `/todos/project/${pid}`);
  },

  fetchIncomplete({ pid }) {
    return request('get', `/todos/incomplete/${pid}`);
  },

  create(title, pid) {
    return request('post', '/todos', { title, pid });
  },

  update(id, payload) {
    return request('put', `/todos/${id}`, payload);
  },

  destory(id, payload) {
    return request('delete', `/todos/${id}`, payload);
  },
};

export const problem = {
  fetch({ id, pid }) {
    return id ? request('get', `/problems/${id}`) : request('get', `/problems/project/${pid}`);
  },

  create(title, pid) {
    return request('post', '/problems', { title, pid });
  },

  update(id, payload) {
    return request('put', `/problems/${id}`, payload);
  },

  destory(id, payload) {
    return request('delete', `/problems/${id}`, payload);
  },
};

export const concern = {
  fetch({ id, pid }) {
    return id ? request('get', `/concerns/${id}`) : request('get', `/concerns/project/${pid}`);
  },

  create(title, pid) {
    return request('post', '/concerns', { title, pid });
  },

  update(id, payload) {
    return request('put', `/concerns/${id}`, payload);
  },

  destory(id, payload) {
    return request('delete', `/concerns/${id}`, payload);
  },
};

export const setAuthInHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
};

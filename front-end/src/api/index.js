import axios from 'axios';
import router from '../router';
import auth from './auth';
import project from './project';
import work from './work';
import todo from './todo';
import problem from './problem';
import concern from './concern';

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

const setAuthInHeader = (token) => {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
};

export {
  request,
  setAuthInHeader,
  auth,
  project,
  work,
  todo,
  problem,
  concern,
};

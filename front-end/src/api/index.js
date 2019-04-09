import axios from 'axios';
import Qs from 'qs';

import router from '../router';
import auth from './auth';
import project from './project';
import work from './work';
import todo from './todo';
import problem from './problem';
import concern from './concern';

const DOMAIN = 'http://localhost:80';  // production
// const DOMAIN = 'http://localhost:8001'; // devleop
const UNAUTHORIZED = 401;

const onUnauthorized = () => {
  router.push(`/auth/login?returnPath=${encodeURIComponent(location.pathname)}`);
};

const request = (options) =>
  axios({
    method: options.method,
    url: DOMAIN + options.url,
    params: options.params,
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: 'brackets' });
    },
    data: options.data,
  }).then(result => result.data)
    .catch(({ response }) => {
      const { status } = response;
      if (status === UNAUTHORIZED) return onUnauthorized();
      throw Error(response);
    });

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

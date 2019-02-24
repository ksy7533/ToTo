import axios from 'axios';
import router from '../router';

const DOMAIN = 'http://localhost:8001';
const UNAUTHORIZED = 401;

// const onUnauthorized = () => {
//   router.push('/login');
// };

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  }).then((result) => {
    return result.data;
  })
    .catch((result) => {
      const { status } = result.response;
      if (status === UNAUTHORIZED) {
        router.push('/login');
        return result.response;
      }
      throw Error(result);
    });
};

export const auth = {
  login(email, password) {
    return request('post', '/auth/login', {
      email,
      password,
    });
  },
};

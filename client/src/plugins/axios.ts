import * as axios from 'axios';

const axiosUnauthPlugin = axios.default.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'content-type': 'application/json',
  }
});

const axiosAuthPlugin = axios.default.create({
  baseURL: 'http://127.0.0.1:8000',
});

export {
  axiosUnauthPlugin,
  axiosAuthPlugin,
};

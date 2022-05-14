import * as axios from 'axios';

import { Constant } from "../config";

const axiosUnauthPlugin = axios.default.create({
  baseURL: Constant.Environment.BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

const axiosAuthPlugin = axios.default.create({
  baseURL: Constant.Environment.BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

export {
  axiosUnauthPlugin,
  axiosAuthPlugin,
};

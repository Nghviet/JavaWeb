import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.Auth;
    config.headers.Authorization =  token ? `Basic ${token}` : '';
    return config;
  });

export default instance;
import axios from 'axios';

const instance = axios.create({
  headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.Auth;
    config.headers.Authorization =  token ? `Basic ${token}` : '';
    return config;
  });

export default instance;
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        authorization: 'Basic ' +localStorage.getItem('Auth')
    },
});

export default instance;
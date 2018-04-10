import axios from 'axios';
import EventEmitter from 'events';

const isDevelopment = process.env.NODE_ENV === 'development';
const BASE_URL = isDevelopment ? 'https://0.0.0.0:8080' : '/';

export default class Api {
  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    this.event = new EventEmitter();

    this.configureAxios();
  }

  async get(route) {
    const response = await this.axios.get(route);
    return response && response.data;
  }

  async post(route, params) {
    const response = await this.axios.post(route, params);
    return response && response.data;
  }

  async auth(userName, password) {
    await axios.create({
      baseURL: BASE_URL,
      auth: {
        username: userName,
        password: password
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).get(`/api/users/me`);

    this.event.emit('login');
  }

  onLogin(cb) {
    this.event.on('login', cb);
  }

  onLogout(cb) {
    this.event.on('logout', cb);
  }

  configureAxios() {
    this.axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // if (error.response.status === 401) {
        //   this.event.emit('logout');
        // }
      }
    );
  }
}



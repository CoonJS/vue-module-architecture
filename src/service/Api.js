import axios from 'axios';
import EventEmitter from 'events';

const isDevelopment = process.env.NODE_ENV === 'development';
const BASE_URL = isDevelopment ? 'http://0.0.0.0:8080' : '/';

export default class Api {
  constructor() {
    this.axios = axios;
    this.event = new EventEmitter();

    this.configureAxios();
  }

  async get(route) {
    const response = await this.axios.get(BASE_URL + route);
    return response && response.data;
  }

  async post(route, params) {
    const response = await this.axios.post(BASE_URL + route, params);
    return response && response.data;
  }

  async auth(userName, password) {
    await this.axios.create({
      auth: {
        username: userName,
        password: password
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
    }).get(`${BASE_URL}/api/me`);

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



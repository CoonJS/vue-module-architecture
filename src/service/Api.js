import axios from 'axios';
import EventEmitter from 'events';
import { stringify } from 'query-string';

import apiSchema from '../apiSchema';

export default class Api {

  constructor() {
    this.name = 'Api';

    this.schema = apiSchema;

    this.axios = axios.create({
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    this.event = new EventEmitter();

    this.configureAxios();

    this.user = null;
  }

  hasAccess(authority) {
    if (this.user === null) {
      return false;
    }

    if (this.user.owner === true) {
      return true;
    }

    return this.user.authorities.includes(authority);
  }

  getCurrentUser() {
    return this.user;
  }

  async auth(userName, password) {
    await axios.create({
      auth: {
        username: userName,
        password: password
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).get('/api/users/me');

    this.event.emit('login');
  }

  async loadUser() {
    try {
      const response = await this.get('currentUserUsingGET');
      this.user = response ? response.data : null;
    } catch(e) {
      this.user = null;
      throw e;
    }

    return this.user;
  }

  async get(id, templateParams, queryParams) {
    const hasQueryParams = queryParams !== undefined;
    const urlPath = this._buildUrlById(id, templateParams, 'get');
    const path = !hasQueryParams
      ? urlPath
      : urlPath + '?' + stringify(queryParams);

    return await this.axios.get(path);
  }

  async post(id, params, body = {}) {
    const path = this._buildUrlById(id, params, 'post');
    return await this.axios.post(path, body);
  }

  async put(id, params, body = {}) {
    const path = this._buildUrlById(id, params, 'put');
    return await this.axios.put(path, body);
  }

  async patch(id, params, body = {}) {
    const path = this._buildUrlById(id, params, 'patch');
    return await this.axios.patch(path, body);
  }

  async delete(id, params, body = {}, queryParams) {
    const hasQueryParams = queryParams !== undefined;
    const urlPath = this._buildUrlById(id, params, 'delete');
    const path = !hasQueryParams
      ? urlPath
      : urlPath + '?' + stringify(queryParams);

    return await this.axios.delete(path, body);
  }

  async logout() {
    const response = await this.get('logoutUsingGET');
    await this.get('currentUserUsingGET');
    return response && response.data;
  }

  async changePassword(token, newPassword) {
    try {
      await this.put('setNewPasswordAndLoginUsingPUT', {}, {
        token,
        newPassword
      });
    } catch (e) {
      throw e;
    }

    this.event.emit('login');

  }

  async registerUser({ token, login, firstName, lastName, password }) {
    try {
      await this.post('createdUserUsingPOST', {},
        {
          token,
          login,
          firstName,
          lastName,
          password
        }
      );
    } catch (e) {
      throw e;
    }

    this.event.emit('login');
  }

  async registerAccount({ name, token, adminFirstName, adminLastName, password }) {
    try {
      await this.post('createdAccountUsingPOST', {},
        {
          name,
          token,
          adminFirstName,
          adminLastName,
          password
        }
      );

      await this.loadUser();
    } catch (e) {
      throw e;
    }

    this.event.emit('login');
  }

  onError(cb) {
    this.event.on('error', (msg) => {
      return cb(msg);
    });
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
        return response;
      },
      (error) => {
        const errorStatus = error.response.status;
        if (errorStatus === 401) {
          this.event.emit('logout');
          this.user = null;
          return;
        }

        if (errorStatus === 500 || errorStatus === 400 || errorStatus === 404 || errorStatus === 403) {
          this.event.emit('error', error.response.data.message);
          return;
        }

        if (errorStatus === 504) {
          // this.event.emit('error', 'Проверьте свое соединение к сети');
        }
      }
    );
  }

  _buildUrlById(operationId, params, methodType) {
    const { basePath, paths } = this.schema;

    const methodPath = Object.keys(paths).find(path => {
      const methods = paths[path][methodType];
      return methods !== undefined && methods['operationId'] === operationId;
    });

    if (!methodPath) {
      throw new Error(`Operation ID not found: '${operationId}'`);
    }

    return this._buildPathWithParams(`${basePath}${methodPath}`, params);
  }

  _buildPathWithParams(path, params) {
    if (!params) {
      return path;
    }

    const matches = path.match(/{\w+}/g);

    if (!matches) {
      return path;
    }

    matches.forEach(match => {
      const propName = match.replace(/({|})/g, '');
      path = path.replace(match, params[propName]);
    });

    return path;
  }
}



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
  }


  async get(id, templateParams, queryParams) {
    const hasQueryParams = queryParams !== undefined;
    const urlPath = this._buildUrlById(id, templateParams, 'get');
    const path = !hasQueryParams
      ? urlPath
      : urlPath + '?' + stringify(queryParams);

    return await this.axios.get(path);
  }

  async post(id, params, body) {
    const path = this._buildUrlById(id, params, 'post');
    return await this.axios.post(path, body);
  }

  async put(id, params, body) {
    const path = this._buildUrlById(id, params, 'put');
    return await this.axios.put(path, body);
  }

  async patch(id, params, body) {
    const path = this._buildUrlById(id, params, 'patch');
    return await this.axios.patch(path, body);
  }

  async delete(id, params, body) {
    const path = self._buildUrlById(id, params, 'delete');
    return await this.axios.delete(path, body);
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
    }).get(`/api/users/me`);

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

      this.event.emit('login');
    } catch (e) {
      throw e;
    }
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

      this.event.emit('login');
    } catch (e) {
      throw e;
    }
  }

  async logout() {
    const response = await this.get('logoutUsingGET');
    await this.get('currentUserUsingGET');
    return response && response.data;
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
        if (error.response.status === 401) {
          this.event.emit('logout');
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



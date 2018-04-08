import Api from './service/Api';
import Cookie from './service/Cookie';

class Locator {
  constructor() {
    this._serviceNames = [];
  }

  registerService(Service) {
    const service = new Service(this);
    const serviceName = service.constructor.name;

    if (this._serviceNames.includes(serviceName)) {
      throw `service ${serviceName} exist`;
    }

    this._serviceNames.push(serviceName);
    this[serviceName] = service;
  }
}

const locator = new Locator();

locator.registerService(Api);
locator.registerService(Cookie);

export default locator;

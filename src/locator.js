import Api from './service/Api';
import Module from './service/Module';
import Component from './service/Component';

class Locator {
  constructor() {
    this._serviceNames = [];
  }

  registerService(Service) {
    const service = new Service(this);
    const serviceName = service.name;

    if (this._serviceNames.includes(serviceName)) {
      throw `service ${serviceName} exist`;
    }

    this._serviceNames.push(serviceName);
    this[serviceName] = service;
  }
}

const locator = new Locator();

locator.registerService(Api);
locator.registerService(Module);
locator.registerService(Component);

export default locator;

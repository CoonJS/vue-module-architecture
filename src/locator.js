import Api from './service/Api';
import Router from './service/Router';
import DateTime from './service/DateTime';
import Component from './service/Component';
import ArrayUtils from './service/ArrayUtils';
import ObjectUtils from './service/ObjectUtils';
import NumberUtils from './service/Number';
import FileUtils from './service/FileUtils';

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

locator.registerService(ArrayUtils);
locator.registerService(ObjectUtils);
locator.registerService(NumberUtils);
locator.registerService(DateTime);
locator.registerService(Api);
locator.registerService(Router);
locator.registerService(Component);
locator.registerService(FileUtils);

export default locator;

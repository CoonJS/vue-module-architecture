export default class Router {

  constructor() {
    this.name = 'Router';
    this.routes = [];
  }

  registerModuleRoutes(routes = []) {
    this.routes = [ ...this.routes, ...routes ];
  }

  getRoutes() {
    return this.routes;
  }
}



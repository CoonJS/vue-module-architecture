const AuthPage = () => import(/* webpackChunkName: "auth" */'./index.vue');

export default async function(locator) {
  /** @type {Router}*/
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/auth',
      name: 'AuthPage',
      component: AuthPage
    }
  ]);
}
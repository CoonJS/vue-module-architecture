const UsersPage = () => import(/* webpackChunkName: "users" */'./index.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/users',
      name: 'Users',
      component: UsersPage
    }
  ]);
}
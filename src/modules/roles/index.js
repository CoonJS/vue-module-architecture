import Role from './src/service/Role';

const RolesPage = () => import(/* webpackChunkName: "roles" */'./index.vue');

export default async function(locator) {
  locator.registerService(Role);

  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/roles',
      name: 'Roles',
      component: RolesPage
    }
  ]);

}
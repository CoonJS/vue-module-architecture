const DashboardsPage = () => import(/* webpackChunkName: "dashboard" */'./index.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/',
      name: 'Root',
      component: DashboardsPage
    }
  ]);
}
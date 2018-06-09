const ReportsPage = () => import(/* webpackChunkName: "reports" */'./index.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/',
      name: 'Root',
      component: ReportsPage
    }
  ]);
}
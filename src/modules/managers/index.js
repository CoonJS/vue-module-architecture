const ManagersPage = () => import(/* webpackChunkName: "managers" */'./index.vue');
const ManagerCard = () => import(/* webpackChunkName: "manager" */'./pages/Card.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/managers',
      name: 'ManagersPage',
      component: ManagersPage
    },
    {
      path: '/managers/:id',
      name: 'ManagerPage',
      component: ManagerCard
    }
  ]);
}
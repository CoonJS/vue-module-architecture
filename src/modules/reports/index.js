const ReportsPage = () => import(/* webpackChunkName: "reports" */'./index.vue');
const ManagersPage = () => import(/* webpackChunkName: "managers" */'./index.vue');
const ManagerCard = () => import(/* webpackChunkName: "manager" */'./pages/ManagerCard.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/',
      name: 'Root',
      component: ReportsPage
    },
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
const TestingPage = () => import(/* webpackChunkName: "testing"*/'./index.vue');
const TestStatisticsPage = () => import(/* webpackChunkName: "test.statistics"*/'./pages/statistics.vue');

export default async function(locator) {
  /**@type {Router}*/
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/testing',
      name: 'TestingPage',
      component: TestingPage
    },
    {
      path: '/testing/statistics',
      name: 'TestStatisticsPage',
      component: TestStatisticsPage
    }
  ]);
}
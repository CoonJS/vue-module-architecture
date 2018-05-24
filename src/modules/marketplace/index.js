const MarketplacePage = () => import(/* webpackChunkName: "marketplace"*/'./index.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/marketplace',
      name: 'MarketplacePage',
      component: MarketplacePage
    }
  ]);
}
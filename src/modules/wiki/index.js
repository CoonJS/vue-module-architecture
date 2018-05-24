const WikiPage = () => import(/* webpackChunkName: "wiki"*/'./index.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/wiki',
      name: 'WikiPage',
      component: WikiPage
    }
  ]);
}
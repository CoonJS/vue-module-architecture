const SettingsPage = () => import(/* webpackChunkName: "settings" */'./index.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/settings',
      name: 'SettingsPage',
      component: SettingsPage
    }
  ]);
}
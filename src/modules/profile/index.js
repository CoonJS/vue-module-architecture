const ProfilePage = () => import(/* webpackChunkName: "profile" */'./index.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/profile',
      name: 'UserProfile',
      component: ProfilePage
    }
  ]);
}
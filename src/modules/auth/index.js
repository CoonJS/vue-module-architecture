const AuthPage = () => import(/* webpackChunkName: "auth" */'./index.vue');
const ChangePasswordPage = () => import(/* webpackChunkName: "change-password" */'./pages/ChangePassword.vue');

export default async function(locator) {
  /** @type {Api}*/
  const api = locator.Api;
  /** @type {Router}*/
  const routerService = locator.Router;


  try {
    await api.loadUser();
  } catch (e) {

  }

  routerService.registerModuleRoutes([
    {
      path: '/auth',
      name: 'AuthPage',
      component: AuthPage
    },
    {
      path: '/password-remind',
      name: 'ChangePassword',
      component: ChangePasswordPage
    }
  ]);
}
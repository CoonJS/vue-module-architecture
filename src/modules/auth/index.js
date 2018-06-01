const AuthPage = () => import(/* webpackChunkName: "auth" */'./index.vue');
const ChangePasswordPage = () => import(/* webpackChunkName: "change-password" */'./pages/ChangePassword.vue');

export default async function(locator) {
  /** @type {Router}*/
  const routerService = locator.Router;

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
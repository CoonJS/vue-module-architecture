const AuthPage = () => import(/* webpackChunkName: "auth" */'./index.vue');
const UserRegistrationPage = () => import(/* webpackChunkName: "register-user" */'./pages/RegisterUser.vue');
const ChangePasswordPage = () => import(/* webpackChunkName: "change-password" */'./pages/ChangePassword.vue');
const AccountRegistrationPage = () => import(/* webpackChunkName: "register-account" */'./pages/RegisterAccount.vue');

export default async function(locator) {
  /** @type {Api}*/
  const api = locator.Api;
  /** @type {Router}*/
  const routerService = locator.Router;

  await api.loadUser();

  routerService.registerModuleRoutes([
    {
      path: '/auth',
      name: 'AuthPage',
      component: AuthPage
    },
    {
      path: '/user-registration',
      name: 'UserRegistration',
      component: UserRegistrationPage
    },
    {
      path: '/password-remind',
      name: 'ChangePassword',
      component: ChangePasswordPage
    },
    {
      path: '/account-registration',
      name: 'AccountRegistration',
      component: AccountRegistrationPage
    }
  ]);
}
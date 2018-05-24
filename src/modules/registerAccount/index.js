const AccountRegistrationPage = () => import(/* webpackChunkName: "register-account" */'./index.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/account-registration',
      name: 'AccountRegistration',
      component: AccountRegistrationPage
    }
  ]);
}
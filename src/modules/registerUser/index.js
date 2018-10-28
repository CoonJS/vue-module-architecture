const UserRegistrationPage = () => import(/* webpackChunkName: "register-user" */'./index.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/user-registration',
      name: 'UserRegistration',
      component: UserRegistrationPage
    }
  ]);
}
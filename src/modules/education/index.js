const IndexPage = () => import(/* webpackChunkName: "educationIndex" */'./index.vue');
const ProfilePage = () => import(/* webpackChunkName: "educationProfile" */'./pages/Profile.vue');

export default async function(locator) {
  /** @type {Api}*/
  const api = locator.Api;
  /** @type {Router}*/
  const routerService = locator.Router;

  await api.loadUser();

  routerService.registerModuleRoutes([
    {
      path: '/education',
      name: 'EducationHomePage',
      component: IndexPage
    },
    {
      path: '/education/profile',
      name: 'EducationProfilePage',
      component: ProfilePage
    }
  ]);
}
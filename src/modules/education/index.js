const IndexPage = () => import(/* webpackChunkName: "educationIndex" */'./index.vue');
const EducationNewCourse = () => import(/* webpackChunkName: "newCourse" */'./pages/NewCourse.vue');

export default async function(locator) {
  /** @type {Router}*/
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/education',
      name: 'EducationHomePage',
      component: IndexPage
    },
    {
      path: '/education/new',
      name: 'EducationNewCourse',
      component: EducationNewCourse
    }
  ]);
}
const Courses = () => import(/* webpackChunkName: "courses" */'./index.vue');
const NewCourse = () => import(/* webpackChunkName: "newCourse" */'./pages/NewCourse.vue');
const CourseView = () => import(/* webpackChunkName: "coursePage" */'./pages/CourseView.vue');

export default async function(locator) {
  /** @type {Router}*/
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/courses',
      name: 'Courses',
      component: Courses
    },
    {
      path: '/courses/new',
      name: 'NewCourse',
      component: NewCourse
    },
    {
      path: '/courses/:id',
      name: 'CourseView',
      component: CourseView
    },
  ]);
}
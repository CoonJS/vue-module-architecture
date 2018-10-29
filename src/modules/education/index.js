export default async function(locator) {
  /** @type {Router}*/
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/courses',
      name: 'Courses',
      component: () => import(/* webpackChunkName: "courses" */'./index.vue')
    },
    {
      path: '/courses/edit/:id',
      name: 'CourseEdit',
      component: () => import(/* webpackChunkName: "courseEdit" */'./pages/CourseEdit.vue')
    },
    {
      path: '/courses/:id',
      name: 'CourseView',
      component: () => import(/* webpackChunkName: "coursePage" */'./pages/CourseView.vue')
    }
  ]);
}

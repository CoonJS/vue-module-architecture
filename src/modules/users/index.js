const UsersPage = () => import(/* webpackChunkName: "users" */'./index.vue');
const UserCardPage = () => import(/* webpackChunkName: "userCard" */'./pages/UserCard.vue');

export default async function(locator) {
  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/users',
      name: 'Users',
      component: UsersPage
    },
    {
      path: '/users/:userId',
      name: 'UserCardPage',
      component: UserCardPage
    }
  ]);
}
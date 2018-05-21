import VueRouter from 'vue-router';

const WikiPage = () => import(/* webpackChunkName: "wiki"*/'./modules/wiki/index.vue');
const AuthPage = () => import(/* webpackChunkName: "auth" */'./modules/auth/index.vue');
const ProfilePage = () => import(/* webpackChunkName: "profile" */'./modules/profile/index.vue');
const UsersPage = () => import(/* webpackChunkName: "users" */'./modules/users/index.vue');
const SettingsPage = () => import(/* webpackChunkName: "settings" */'./modules/settings/index.vue');
const ManagersPage = () => import(/* webpackChunkName: "managers" */'./modules/managers/index.vue');
const ManagerCard = () => import(/* webpackChunkName: "manager" */'./modules/managers/pages/Card.vue');
const AccountRegistrationPage = () => import(/* webpackChunkName: "register-account" */'./modules/registration/index.vue');
const UserRegistrationPage = () => import(/* webpackChunkName: "register-user" */'./modules/registerUser/index.vue');
const DashboardsPage = () => import(/* webpackChunkName: "dashboard" */'./modules/dashboards/index.vue');
const MarketplacePage = () => import(/* webpackChunkName: "marketplace"*/'./modules/marketplace/index.vue');

const routes = [
  {
    path: '/',
    name: 'Root',
    component: DashboardsPage
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: AuthPage
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage
  },
  {
    path: '/registration',
    name: 'AccountRegistration',
    component: AccountRegistrationPage
  },
  {
    path: '/user-registration',
    name: 'UserRegistration',
    component: UserRegistrationPage
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: ProfilePage
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersPage
  },
  {
    path: '/managers',
    name: 'ManagersPage',
    component: ManagersPage
  },
  {
    path: '/managers/:id',
    name: 'ManagerPage',
    component: ManagerCard
  },
  {
    path: '/marketplace',
    name: 'MarketplacePage',
    component: MarketplacePage
  },
  {
    path: '/wiki',
    name: 'WikiPage',
    component: WikiPage
  }
];

export default new VueRouter({ routes });

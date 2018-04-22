import VueRouter from 'vue-router';

const AuthPage = () => import(/* webpackChunkName: "auth" */'./modules/auth/index.vue');
const ProfilePage = () => import(/* webpackChunkName: "profile" */'./modules/profile/index.vue');
const SettingsPage = () => import(/* webpackChunkName: "settings" */'./modules/settings/index.vue');
const ManagersPage = () => import(/* webpackChunkName: "managers" */'./modules/managers/index.vue');
const RegisterPage = () => import(/* webpackChunkName: "register" */'./modules/register/index.vue');
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
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: ProfilePage
  },
  {
    path: '/managers',
    name: 'ManagersPage',
    component: ManagersPage
  },
  {
    path: '/marketplace',
    name: 'MarketplacePage',
    component: MarketplacePage
  }
];

export default new VueRouter({ routes });

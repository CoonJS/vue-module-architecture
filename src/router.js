import VueRouter from 'vue-router';

import AuthPage from './pages/auth/index.vue';
import ProfilePage from './pages/profile/index.vue';
import SettingsPage from './pages/settings/index.vue';
import ManagersPage from './pages/managers/index.vue';
import RegisterPage from './pages/register/index.vue';
import DashboardsPage from './pages/dashboards/index.vue';
import MarketplacePage from './pages/marketplace/index.vue';

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

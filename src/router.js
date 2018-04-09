import VueRouter from 'vue-router';

import AuthPage from './pages/auth/index.vue';
import ProfilePage from './pages/profile/index.vue';
import ManagersPage from './pages/managers/index.vue';
import RegisterPage from './pages/register/index.vue';
import DashboardsPage from './pages/dashboards/index.vue';

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
  }
];

export default new VueRouter({ routes });

import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';

import './src/global.css';
import 'element-ui/lib/theme-chalk/index.css';

import App from './src/App.vue';
import router from './src/router';
import locator from './src/locator';

Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.prototype.$locator = locator;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
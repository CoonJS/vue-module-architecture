import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import { run } from './src/bootstrap';
import { registerGlobalComponents } from './src/components';

import './src/global.css';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/ru-RU';

locale.use(lang);

import App from './src/App.vue';
import router from './src/router';
import locator from './src/locator';

Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.prototype.$locator = locator;
registerGlobalComponents(locator);

run().then(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
});
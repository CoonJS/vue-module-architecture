import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import { run } from './src/bootstrap';
import { initVuePrototype } from  './src/vuePrototype';
import { registerGlobalComponents } from './src/components';

import App from './src/App.vue';
import locator from './src/locator';

import './src/global.css';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/ru-RU';

locale.use(lang);

Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.prototype.$locator = locator;

initVuePrototype(Vue);

registerGlobalComponents(locator);

run(locator).then(() => {
  const routes = locator.Router.getRoutes();
  const router = new VueRouter({ routes });

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
});
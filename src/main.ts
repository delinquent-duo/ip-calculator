import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { Network } from './core/Network';
import * as H from './core/helpers';

Vue.config.productionTip = false;

(window as any).Network = Network;
(window as any).H = H;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

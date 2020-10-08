import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import moment from 'moment'
import ActionCableVue from 'actioncable-vue';
import { WEBSOCKET_URL } from '@/constants';
import store from '@/store';

Vue.prototype.moment = moment

Vue.config.productionTip = false

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: WEBSOCKET_URL, // or function which returns a string with your JWT appended to your server URL as a query parameter
  connectImmediately: true,
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import moment from 'moment'

Vue.prototype.moment = moment

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

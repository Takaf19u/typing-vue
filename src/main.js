// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('intersection-observer');
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/sass/font.scss'
import './css/ress.css'
import Inview from 'vueinview'


Vue.use(Inview);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/typingMain'
import Top from '@/components/top'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'top', component: Top },
    { path: '/typing', name: 'Main', component: Main }
  ]
})

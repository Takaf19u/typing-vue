import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/typingMain'
import Top from '@/components/top'

/* アイコン用設定ここから */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far)

Vue.component('font-awesome-icon', FontAwesomeIcon)
/* ここまで */

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'top',component: Top },
    { path: '/typing', name: 'Main', component: Main}
  ]
})

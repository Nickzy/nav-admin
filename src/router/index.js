import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import selfMenu from '../menu/index.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: selfMenu
  }]
})

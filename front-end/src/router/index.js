import Vue from 'vue'
import Router from 'vue-router'
import wyh_home from "../wyh_home";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'wyh_home',
      component: wyh_home
    }
  ]
})

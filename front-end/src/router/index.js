import Vue from 'vue'
import Router from 'vue-router'
import wyh_home from "../wyh_home";
import userHome from "../userPage/userHome";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'wyh_home',
      component: wyh_home
    },{
    path:'/userHome',
      name: 'userHome',
      component:userHome
    }
  ]
})

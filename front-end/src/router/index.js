import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../wyh_home')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('../views/homepage')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/questions',
    name: 'Questions',
    component: () => import('@/views/QuestionsList')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../components/search')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/article/Article.vue'),
    children: [
      {
        path: '',
        component: () => import ('../views/article/Overviews')
      },
      {
        path: 'comments',
        name: 'Comments',
        component: () => import('../views/article/CommentsList')
      },
      {
        path: 'overviews',
        name: 'Overviews',
        component: () => import('../views/article/Overviews')
      },
      {
        path: 'citations',
        name: 'Citations',
        component: () => import('../views/article/Citations')
      },
      {
        path: 'references',
        name: 'References',
        component: () => import('../views/article/References')
      },
      {
        path: 'stats',
        name: 'Stats',
        component: () => import('../views/article/Stats')
      }
    ]
  },
  {
    path:'/userHome',
    name: 'userHome',
    component: () => import('../userPage/userHome')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {changeViewTime} from "../request/api";

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('../views/homepage')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('../views/homepage')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/UserEntry/Login')
  },
  {
    path: '/loginAdmin',
    name: 'LoginAdmin',
    component: () => import('../views/admin/LoginAdmin')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/Admin'),
    children: [
      {
        path: 'adminHome',
        name: 'AdminHome',
        component: () => import('../views/admin/AdminHome')
      },
      {
        path: 'applications',
        name: 'Applications',
        component: () => import('../views/admin/Applications')
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/UserEntry/Register')
  },
  {
    path: '/questions',
    name: 'Questions',
    component: () => import('../views/QuestionsList')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../components/search')
  },
  {
    path: '/article/:paper_id',
    name: 'Article',
    redirect: '/article/:paper_id/overviews',
    component: () => import('../views/article/Article.vue'),
    children: [
      // {
      //   path: '',
      //   component: () => import ('../views/article/Overviews')
      // },
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
    path: '/userHome',
    name: 'userHome',
    component: () => import('../views/userPage/userHome')
  },
  {
    path: '/Institution',
    name: 'Institution',
    component: () => import('../views/Institution')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Home')
  },
  {
    path: '/wyhTest',
    name: 'wyhRelationshipMapClickEventTest',
    component: () => import('../views/wyhRelationshipMapClickEventTest')
  },
  {
    path: '/letter',
    name: 'Letter',
    component: () => import('../views/Letter')
  },
  {
    path: '/authorPage',
    name: 'authorPage',
    component: () => import('../views/userPage/authorPage')
  },
  {
    path: '/identification',
    name: 'identification',
    component: () => import('../views/userPage/identification')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
router.beforeEach((to, from, next) => {
  if (to.path == '/authorPage') {
    if (from.path != '/authorPage'||(from.path == '/authorPage' && from.query.id != to.query.id)) {
      changeViewTime({
        author_id: to.query.id
      }).then(res => {
        console.log(res)
      })
    }

    next()
  } else {
    next()
  }

})

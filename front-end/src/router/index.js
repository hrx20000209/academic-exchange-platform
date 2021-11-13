import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/questions',
      name: 'Questions',
      component:() => import('@/views/QuestionsList')
    },
    {
      path: '/article',
      name: 'Article',
      component:() => import('@/views/article/CommentsList')
    }
  ]
})

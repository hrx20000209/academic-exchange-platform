import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import myHeader from './components/myHeader'
import myCloud from './components/keywordsCloud'
import './styles/font.css'

Vue.component('mycloud', myCloud)
Vue.component('myHeader', myHeader)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

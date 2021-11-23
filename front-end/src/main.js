// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import myHeader from './components/myHeader'
import myCloud from './components/keywordsCloud'
import './styles/font.css'
import * as echarts from 'echarts';

Vue.use(echarts)
Vue.component('mycloud', myCloud)
Vue.component('myHeader', myHeader)
import axios from 'axios'
Vue.prototype.$http = axios

import VueAxios from "vue-axios";
Vue.use(VueAxios, axios)
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

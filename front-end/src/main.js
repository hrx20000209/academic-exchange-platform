// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import myHeader from './components/myHeader'
import myCloud from './components/keywordsCloud'
import './styles/font.css'
import * as echarts from 'echarts'
import axios from 'axios'
import VueAxios from "vue-axios"
import store from './store'
import BubbleChat from "vue-bubble-chat"
import QRCode from 'qrcodejs2'

import Clipboard from 'v-clipboard'

Vue.use(Clipboard)
Vue.component('mycloud', myCloud)
Vue.component('myHeader', myHeader)

Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(echarts)
Vue.use(BubbleChat)
Vue.config.productionTip = false

require('es6-promise').polyfill()
require('es6-promise/auto')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

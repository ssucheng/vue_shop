import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import nprogress from 'nprogress'
// vxtable 局部引入
import './plugins/utils'
import './plugins/table'
import 'vxe-table/lib/index.css'
// element-ui 局部引入
import './plugins/element.js'
// 全局样式
import './assets/style/css/global.css'
// 引入字体库
import './assets/style/iconfont/iconfont.css'
// 引入样式
import 'nprogress/nprogress.css'
// 设置基础请求地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
// 设置请求头 Authorization
axios.interceptors.request.use((config) => {
  // console.log(config)
  nprogress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use((config) => {
  // console.log(config)
  nprogress.done()
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

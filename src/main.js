import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import ZkTable from 'vue-table-with-tree-grid' // 引入树形表格组件
// import VueRouter from 'vue-router'
import 'xe-utils' //  VXETable
import VXETable from 'vxe-table' // VXETable
import 'vxe-table/lib/index.css'
import './plugins/element.js'
// 全局样式
import './assets/style/css/global.css'
// 引入字体库
import './assets/style/iconfont/iconfont.css'
// 设置基础请求地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
// 设置请求头 Authorization
axios.interceptors.request.use((config) => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// Vue.component(ZkTable.name, ZkTable) // 全局注册组件

Vue.use(VXETable)// VXETable
// 给 vue 实例挂载全局窗口对象，属性名称随意定义，例如：$XModal
Vue.prototype.$modal = VXETable.modal// VXETable

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

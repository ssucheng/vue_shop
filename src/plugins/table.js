import Vue from 'vue'
import XEUtils from 'xe-utils'
import {
  VXETable,
  Table
} from 'vxe-table'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'
// 按需加载的方式默认是不带国际化的，需要自行导入
VXETable.setup({
  i18n: (key, value) => XEUtils.get(zhCNLocat, key)
})
Vue.use(Table)

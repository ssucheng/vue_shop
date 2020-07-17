import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Pagination,
  Switch,
  Dialog,
  Tooltip,
  Tag,
  MessageBox,
  Select,
  Tree,
  Loading,
  Option,
  Cascader
} from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(Select)
Vue.use(Tree)
Vue.use(Option)
Vue.use(Cascader)

Vue.use(Loading.directive) // 使用loading组件
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// Vue.prototype.$confirm = confirm
// Vue.use(Message.success({
//   message: '测试',
//   type: 'success'
// }))

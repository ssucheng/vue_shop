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
  Loading
} from 'element-ui'

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
Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// Vue.prototype.$confirm = confirm
// Vue.use(Message.success({
//   message: '测试',
//   type: 'success'
// }))

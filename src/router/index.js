import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'
import User from '../components/user/User.vue'
import welcome from '../components/Welcome.vue'
import Right from '../components/right/Rights.vue'
import Role from '../components/right/Role.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: welcome },
      { path: '/users', component: User },
      { path: '/rights', component: Right },
      { path: '/roles', component: Role }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 重复点击 报错解决方案
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/')
  next()
})
export default router

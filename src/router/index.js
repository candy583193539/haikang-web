// 配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'

const Person = () => import('../views/person/Person')
const Vehicle = () => import('../views/vehicle/Vehicle')
// 1.通过 Vue.use 安装插件
Vue.use(VueRouter)

// 2.配置路由和组件之间的应用关系
const routes = [
  {
    path: '',
    redirect: '/person'
  },
  {
    path: '/person', // 人员
    component: Person
  },
  {
    path: '/vehicle', // 分类
    component: Vehicle
  }
]

// 3.创建VueRouter 对象
const router = new VueRouter({
  mode: 'history', // 去掉地址栏里的 # 号
  base: process.env.BASE_URL,
  routes
})

// 4.将router 对象传入到VUE实例  --> 然后在main.js 中使用
export default router

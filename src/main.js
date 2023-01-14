import Vue from 'vue'
import App from './App.vue'
import router from './router' // 导入路由
import store from './store' // 状态管理
import Vant from 'vant'

import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

// Vue.use(ElementUI)

new Vue({
  router, // 属于简写方式 等同于  router: router 若果key value 不一致则不能简写
  store,
  render: h => h(App)
}).$mount('#app')

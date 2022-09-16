import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 引入路由
import router from '@/router'
// 三级联动组件
import TypeNav from "@/pages/Home/TypeNav"
Vue.component(TypeNav.name,TypeNav);

// 测试
// import {reqCategroyList} from "@/api"
// reqCategroyList()

// 引入vuex
import store from './store'

new Vue({
  render: h => h(App),
  router:router,
  store,
}).$mount('#app')

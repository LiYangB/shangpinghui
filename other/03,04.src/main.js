import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 引入路由
import router from '@/router'
// 三级联动组件
import TypeNav from "@/components/TypeNav"
Vue.component(TypeNav.name,TypeNav);

// 引入mock
import "@/mock/mockServe"
// 引入swiper
import "swiper/css/swiper.css"

// 引入vuex
import store from './store'

new Vue({
  render: h => h(App),
  router:router,
  store,
}).$mount('#app')

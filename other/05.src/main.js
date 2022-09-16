import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 引入路由
import router from '@/router'
// 三级联动组件
import TypeNav from "@/components/TypeNav"
import CarouselName from "@/components/Carousel"
Vue.component(TypeNav.name,TypeNav);
Vue.component(CarouselName.name,CarouselName);

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

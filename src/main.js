import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 引入路由
import router from '@/router'
// 全局组件
import TypeNav from "@/components/TypeNav"
import CarouselName from "@/components/Carousel"
import PaginationName from "@/components/Pagination"
Vue.component(TypeNav.name,TypeNav);
Vue.component(CarouselName.name,CarouselName);
Vue.component(PaginationName.name, PaginationName)

// 引入接口
import * as API from "@/api"

// 引入mock
import "@/mock/mockServe"
// 引入swiper
import "swiper/css/swiper.css"
// 引入vuex
import store from './store'

// 引入element
import { Button, MessageBox} from 'element-ui';
// 使用element
// 第一种注册全局组件
Vue.component(Button.name, Button);
// 第二种
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
import Naruto from "@/assets/壁纸1.png"
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:Naruto
})


new Vue({
  render: h => h(App),
  router:router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this,
    Vue.prototype.$API=API
    // console.log(this)
  }
}).$mount('#app')

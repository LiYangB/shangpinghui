import Vue from "vue"
import VueRouter from "vue-router"
// 使用插件
Vue.use(VueRouter)
// 引入路由组件,部分采用路由懒加载
// import Home from "@/pages/Home/index.vue"
import Login from "@/pages/Login/index.vue"
import Register from "@/pages/Register/index.vue"
import Search from "@/pages/Search/index.vue"
import Detail from "@/pages/Detail/index.vue"
import AddCartSuccess from "@/pages/AddCartSuccess/index.vue"
import ShopCart from "@/pages/ShopCart/index.vue"
// import Trade from "@/pages/Trade/index.vue"
// import Pay from "@/pages/Pay"
// import PaySuccess from "@/pages/PaySuccess"
// import Center from "@/pages/Center"
// 二级路由
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from "@/pages/Center/groupOrder"

// 引入token与store
import {getToken} from "@/utils/token"
import store from "@/store"

// 重写push||replace方法
// 先将原始push方法复制
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace
// 重写
VueRouter.prototype.push=function(location,res,rej){
    // 如果传了成功,失败的回调
    if(res&&rej){
        originPush.call(this,location,res,rej)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,res,rej){
    if (res && rej) {
        originReplace.call(this, location, res, rej)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


// 配置路由
let router= new VueRouter({
    routes:[
        {
            path:"/home",
            name:"home",
            component: () => import("@/pages/Home/index.vue"),
            meta:{
                show:true,
                title:"首页"
            }
        },
        {
            path:"/center",
            name:"ccenter",
            component: () => import("@/pages/Center"),
            meta:{
                show:true,
                title:"个人中心"
            },
            children:[{
                path:"myorder",
                component:MyOrder
            },{
                path:"grouporder",
                component: GroupOrder
            },{
                path:"/center",
                redirect: "/center/myorder"
            }]
        },
        {
            path:"/paysuccess",
            name:"paysuccess",
            component: () => import("@/pages/PaySuccess"),
            meta:{
                show:true,
                title:"支付成功"
            },
            // 独享守卫,只有从支付来的可以进入
            beforeEnter: (to, from, next) => {
                if (from.path == "/pay") {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path:"/pay",
            name:"pay",
            component: () => import("@/pages/Pay"),
            meta:{
                show:true,
                title:"支付"
            },
            // 独享守卫,只有从交易来的可以进入
            beforeEnter: (to, from, next) => {
                if (from.path == "/trade") {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path:"/trade",
            name:"trade",
            component: () => import("@/pages/Trade/index.vue"),
            meta:{
                show:true,
                title:"交易"
            },
            // 独享守卫,只有从购物车来的可以进入
            beforeEnter: (to, from, next) => {
                if(from.path=="/shopcart"){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path:"/shopcart",
            name:"shopcart",
            component:ShopCart,
            meta:{
                show:true,
                title: "购物车"
            },
        },
        {
            path:"/addcartsuccess",
            name:"addcartsuccess",
            component: AddCartSuccess,
            meta:{
                show:true,
                title: "成功添加"
            }
        },
        {
            path:"/detail/:skuId?",
            name:"detail",
            component:Detail,
            meta:{
                show:true,
                title: "商品详情"
            }
        },
        {
            path:"/login",
            name:"login",
            component:Login,
            meta: {
                show: false,
                title: "登录"
            }
        },
        {
            path:"/register",
            name:"register",
            component:Register,
            meta: {
                show: false,
                title: "注册"
            }
        },
        {
            path:"/search/:keyword?",
            name:"search",
            component:Search,
            meta: {
                show: true,
                title: "搜索"
            }
        },
        // 重定向,在项目跑起来时,首先出现的路由
        {
            path:"*",
            redirect:"/home"
        }
    ],
    // 滚动行为
    scrollBehavior(){
        return {y:0}
    }
})

// 全局守卫
router.beforeEach((to,from,next)=>{
    // 获取用户名与token
    let token=getToken();
    let name=store.state.User.userInfo.name;
    // 判断是否登录
    if(token){
        // 已经登录了不允许区登录页面
        if(to.path=='/login'){
            next('/')
        }else{
            // 已经登录且不去登录页面
            // 判断token是否过期
            if(name){
                next()
            }else{
                try {
                    // 重新获取一次
                    store.dispatch("userInfo")
                    // 获取到了就放行
                    next()
                } catch (error) {
                    // 没有就清除token,重新登录
                     store.dispatch("userLogout")
                    next('/login')
                }
            }
        }
    }else{
        let path=to.path
        // 如果去交易,支付,个人中心,就送去登录
        if (path.indexOf("/trade") != -1 || path.indexOf("/pay") != -1 || path.indexOf("/center") != -1){
            // 获取用户想要去的地方
            next("/login?redirect="+path)
        }else{{
            next()
        }}
    }
})
router.afterEach((to)=>{
    if(to.meta.title){
        document.title=to.meta.title
    }else{
        document.title="尚品汇"
    }
})

// 暴露
export default router
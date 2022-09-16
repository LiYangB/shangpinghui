import Vue from "vue"
import VueRouter from "vue-router"
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Home from "@/pages/Home/index.vue"
import Login from "@/pages/Login/index.vue"
import Register from "@/pages/Register/index.vue"
import Search from "@/pages/Search/index.vue"

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
export default new VueRouter({
    routes:[
        {
            path:"/home",
            name:"home",
            component:Home,
            meta:{
                show:true,
            }
        },
        {
            path:"/login",
            name:"login",
            component:Login,
            meta: {
                show: false,
            }
        },
        {
            path:"/register",
            name:"register",
            component:Register,
            meta: {
                show: false,
            }
        },
        {
            path:"/search/:keyword?",
            name:"search",
            component:Search,
            meta: {
                show: true,
            }
        },
        // 重定向,在项目跑起来时,首先出现的路由
        {
            path:"*",
            redirect:"/home"
        }
    ]
})

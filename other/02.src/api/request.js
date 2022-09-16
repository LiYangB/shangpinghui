
// 对axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
// 引入进度条样式
import "nprogress/nprogress.css"

// 使用create方法创建axios的实例对象,以便跟好设置默认配置
const requests=axios.create({
    baseURL:"http://localhost:8080/api",
    timeout:5000,
});

// 请求拦截器
requests.interceptors.request.use(config=>{
    // config配置对象,里面有一个属性很重要(headers请求头)
    // 进度条开始动
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use(response=>{
    // 成功的回调函数,可以对服务器返回的数据进行处理
    // 进度条结束
    nprogress.done()
    return response.data
},error=>{
    return Promise.reject(new Error("flase"))
})


// 暴露requests
export default requests;
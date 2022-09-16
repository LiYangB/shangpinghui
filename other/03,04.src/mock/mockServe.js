
// 引入mock模块
import Mock from "mockjs";
//引入json文件(json,图片默认暴露)
import banner from "./banner.json"
import floor from "./floor.json"
// mock数据:第一个参数请求地址,第二个:请求数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
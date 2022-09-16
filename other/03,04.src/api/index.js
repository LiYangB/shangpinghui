
// 对项目的API进行统一管理
import requests from "./request.js";
import mockRequests from "./mockAjax"

// 三级联动接口  /product/getBaseCategoryList
export const reqCategroyList=()=>{
    return requests({
        url:"/product/getBaseCategoryList",
        method:"get"
    })
}
export const reqGetBannerList=()=>{
    return mockRequests({
        url:"/banner",
        method:"get"
    })
}
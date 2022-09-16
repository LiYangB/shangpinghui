
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
// 首页轮播图
export const reqGetBannerList=()=>{
    return mockRequests({
        url:"/banner",
        method:"get"
    })
}
// floor数据
export const reqGetFloorList=()=>{
    return mockRequests({
        url:"/floor",
        method:"get"
    })
}
// search数据
export const reqGetSearchInfo=(params)=>{
    return requests({
        url:"/list",
        method:"post",
        data:params
    })
}
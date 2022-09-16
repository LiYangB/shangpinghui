
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
// 商品详情
export const reqGetGoodsInfo=(skuId)=>{
    return requests({
        url: `/item/${skuId}`,
        method: "GET",
    })
}
// 将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
    return requests({
        url: `/cart/addToCart/${ skuId }/${ skuNum }`,
        method: "post",
    })
}
// 获取购物车列表
export const reqCartList=()=>{
    return requests({
        url:`/cart/cartList`,
        method:"get"
    })
}
//删除购物车中商品
export const reqDeleteCartById = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: "delete"
    })
}
// 修改购物车中商品勾选状态
export const reqUpdataCheckesById = (skuId,isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: "get"
    })
}
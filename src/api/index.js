
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
//获取验证码/api/user/passport/sendCode/{phone}
export const reqGetCode=(phone)=>{
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: "get"
    })
}
// 完成注册
export const reqUserRegister = (data) => {
    return requests({
        url: `/user/passport/register`,
        data,
        method: "post"
    })
}
// 完成登录
export const reqUserLogin = (data) => {
    return requests({
        url: `/user/passport/login`,
        data,
        method: "post"
    })
}
// 使用token获取用户信息
export const reqUserInfo = () => {
    return requests({
        url: `/user/passport/auth/getUserInfo`,
        method: "get"
    })
}
// 退出登录
export const reqLogout = () => {
    return requests({
        url: `/user/passport/logout`,
        method: "get"
    })
}
// 用户地址
export const reqUserAddress = () => {
    return requests({
        url: `/user/userAddress/auth/findUserAddressList`,
        method: "get"
    })
}
// 购物车信息
export const reqOrderInfo = () => {
    return requests({
        url: `/order/auth/trade`,
        method: "get"
    })
}
// 提交支付商品
export const reqSubmitOrder = (tradeNo,data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: "post"
    })
}
// 获取订单支付信息
export const reqPayInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: "get"
    })
}
// 获取订单支付状态
export const reqPayStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: "get"
    })
}
// 获取我的订单列表
export const reqMyOrder = (page,limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: "get"
    })
}

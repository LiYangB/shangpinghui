
import { reqGetGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份
import {getUUID} from "@/utils/uuid_token"

const actions = {
    // 获取商品详情
    async goodsInfo({ commit },value) {
        let result = await reqGetGoodsInfo(value);
        // console.log(result)
        if (result.code == 200) {
            commit("GOODSINFO", result.data)
        }
    },
    // 将商品添加到购物车
    async addOrUpdateShopCart({ commit }, {skuId,skuNum}) {
        // 防止报错
        commit
        // 
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 返回promise对象
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error("添加至购物车失败"))
        }
    },
}
const mutations = {
    GOODSINFO(state,value){
        state.goodsInfo=value
    }
}
const state = {
    goodsInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    // 产品信息
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    // 产品售卖属性
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    namespaled: true,
    actions,
    mutations,
    state,
    getters,
}
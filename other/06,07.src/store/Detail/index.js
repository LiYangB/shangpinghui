
import { reqGetGoodsInfo } from "@/api"

const actions = {
    // 获取商品详情
    async goodsInfo({ commit },value) {
        let result = await reqGetGoodsInfo(value);
        // console.log(result)
        if (result.code == 200) {
            commit("GOODSINFO", result.data)
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
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    }
}
export default {
    namespaled: true,
    actions,
    mutations,
    state,
    getters,
}

import { reqOrderInfo } from "@/api"

const actions = {
    //   获取用户地址
    // async getUserAddress({commit}){
        // let result=await reqUserAddress()
        // console.log(result)
        // if(result.code==200){
            // commit("GETUSEERADDRESS",result.data)
        // }
        
    // },
    // 获取用户购物车信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        // console.log(result)
        if (result.code == 200) {
            commit("GETORDERINFO", result.data)
        }
    },
}
const mutations = {
    GETUSEERADDRESS(state,userAddress){
        state.userAddress=userAddress
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
const state = {
    // 地址
    userAddress:[],
    // 商品
    orderInfo:{}
}
const getters = {

}
export default {
    namespaled: true,
    actions,
    mutations,
    state,
    getters,
}
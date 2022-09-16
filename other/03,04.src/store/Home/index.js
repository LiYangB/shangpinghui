
import { reqCategroyList, reqGetBannerList } from "@/api"

const actions = {
    // 获取三级联动数据
    async categroyList({commit}){
        let result=await reqCategroyList();
        // console.log(result)
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
    // 获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await  reqGetBannerList();
        // console.log(result)
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(start,value){
        start.categroyList=value
    },
    GETBANNERLIST(start, value) {
        start.bannerList = value
    },
}
const state = {
    // 三级联动
    categroyList:[],
    // 轮播图数据
    bannerList:[]
}
const getters = {

}
export default {
    namespaled:true,
    actions,
    mutations,
    state,
    getters,
}
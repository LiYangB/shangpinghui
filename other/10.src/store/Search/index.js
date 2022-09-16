
import { reqGetSearchInfo } from "@/api"
const actions = {
    async getSearchList({commit},value){
        // console.log(222)
        let result=await reqGetSearchInfo(value)
        if(result.code==200){
            commit("GETSEARCHLIST",result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state,value){
        // console.log(111)
        state.searchList=value
    }
}
const state = {
    searchList:{},
}
const getters = {
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList ||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
}
export default{
    namespaled:true,
    actions,
    mutations,
    state,
    getters,
}
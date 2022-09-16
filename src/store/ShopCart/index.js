
import { reqCartList, reqDeleteCartById, reqUpdataCheckesById } from "@/api"

const actions={
    // 获取购物车数据
    async getCartList({commit}){
        let result=await reqCartList();
        if(result.code==200){
            commit("GETCARTLIST",result.data)
        }
    },
    // 删除购物车中商品
    async deleteCartById({commit},value){
        // 防止报错
        commit
        let result = await reqDeleteCartById(value);
        if (result.code == 200) {
            return "ok"
        }else{
            return Promise.reject(new Error("删除失败"))
        }
    },
    // 修改购物车勾选状态
    async updataCheckesById({ commit }, {skuId,isChecked}) {
        // 防止报错
        commit
        let result = await reqUpdataCheckesById(skuId, isChecked);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("勾选失败"))
        }
    },
    // 删除所有勾选状态的商品
    deleteAllCheckedById({dispatch,getters}){
        // 为promis.all创造一个数组
        let PromiseAll=[]
        // 遍历getter中item.isChecked == 1的
        getters.cartList.cartInfoList.forEach(item=>{
            // 为1就删除
            let promise = item.isChecked == 1 ? dispatch("deleteCartById",item.skuId):"";
            // 将删除的结果放入数组中
            PromiseAll.push(promise)
        });
        // 使用promise.all方法返回结果
        return Promise.all(PromiseAll)
    },
    // 全选
    updateAllCartChecked({dispatch,state},isChecked){
        let PromiseAll=[];
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise= dispatch("updataCheckesById",{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations={
    GETCARTLIST(state,value){
        state.cartList=value
    }
}
const state={
    // 购物车数据
    cartList:[]
}
const getters={
    cartList(state){
        return state.cartList[0]||{}
    }
}
export default{
    namespaled: true,
    actions,
    mutations,
    state,
    getters,
}

import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token"
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        console.log(result)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("无法获取验证码"))
        }
    },
    // 完成注册
    async userRegister({ commit }, data) {
        // 消除报错
        commit
        let result = await reqUserRegister(data)
        // console.log(result)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 完成登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // console.log(result)
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 使用token获取用户信息
    async userInfo({ commit }) {
        let result = await reqUserInfo()
        // console.log(result)
        if (result.code == 200) {
            commit("USERINFO", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        // console.log(result)
        if (result.code == 200) {
            commit("CLEAR")
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
}
const mutations = {
    // 验证码
    GETCODE(state, value) {
        state.code = value
    },
    // token
    USERLOGIN(state, token) {
        state.token = token
    },
    // 用户信息
    USERINFO(state, value) {
        state.userInfo = value
    },
    // 清除
    CLEAR(state){
        state.token="",
        state.userInfo={},
        removeToken()
    }
}
const state = {
    code: "",
    token: getToken(),
    userInfo: {},
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
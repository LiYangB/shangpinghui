import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)
const  actions={

}
const mutations={

}
const state={

}
const getters={

}
import Home from "./Home";
import Search from "./Search";
import Detail from "./Detail"
import ShopCart from "./ShopCart";
import User from "./User";
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    modules:{
        Home,
        Search,
        Detail,
        ShopCart,
        User,
    }
})
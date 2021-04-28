import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
    
    state:{
        menuList: [],
        userInfo:{}
    },


    mutations:{
        // 保存菜单数据
        saveMenuList(state,menuList){
            state.menuList = menuList
        },

        // 保存用户信息
        saveUserInfo(state,info){
            state.userInfo = info
        },
        userLogout(state){
            state.userInfo = {}
        }
    },


    actions:{

         // 调用接口，获得菜单数据
        getMenuList({commit},params = {}){
           
            return new Promise((resolve,reject)=>{
                axios.get("/api/menulist", { params: params })
                .then(result => {
                    
                   commit('saveMenuList',result.data.list)
                   resolve(result)
                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                });
            })
            
        },


        // 用户登录
        userLogin({commit},params = {}){
            return new Promise((resolve,reject) =>{
                axios.post("/api/userlogin",params)
                .then((result) => {
                    console.log(result)
                    commit("saveUserInfo",result.data.list)
                    resolve(result)
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                });
            })
        }

        

    },


    // 插件  createPersistedState 可以把store中的数据保存在localStrage
    plugins:[ createPersistedState()]


})

export default store;
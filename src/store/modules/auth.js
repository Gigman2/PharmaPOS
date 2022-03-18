import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex); 

const state = {
    token: localStorage.getItem("access_token") || "",
    user : JSON.parse(localStorage.getItem("user")) || {},
    fullname: "",
    avatar: "",
    permission: null
}

const mutations = {
    SET_SESSION: (state) => {
      state.token = localStorage.getItem("access_token")
      state.user = JSON.parse(localStorage.getItem("user"))
    },
    LOGOUT: (state) =>{
      localStorage.clear();
      state.token = "";
      state.user = {};
    },
    SET_PERMISSION: (state) => {
      state.permission = JSON.parse(localStorage.getItem("account_permissions"))
    }
}

const actions = {

}

const getters = {
  AVATAR: () => {
    var path = "/assets/images/avatar.gif"
    if(state.user != null){
      if(state.user.avatar){
        path = state.user.avatar
      }
      state.avatar = path
      return state.avatar;
    }
  },
  FULLNAME: () => {
    if(state.user != null){
      if(state.user){
        return state.user.firstname +" "+ state.user.lastname
      }
    }
  },
  USER: () => {
      return state.user
  },
  ISLOGGED: () => {
      if(state.token == ""){
        return false;
      }
      return true; 
  },
  TOKEN: () => {
    return state.token
  },
  ROLE: (state) => {
    if(state.user != null){
      return state.user.role
    }
  },
  PERMISSIONS: () => {
    if(state.permission != null){
      console.log('Permissions are ',state.permission)
      return state.permission
    }
  }
}

export default {
state,getters,mutations,actions
}

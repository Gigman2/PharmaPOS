import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex); 

const state = {
    token: localStorage.getItem("access_token") || "",
    user : JSON.parse(localStorage.getItem("user")) || {},
    fullname: "",
    avatar: "",
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
  }
}

export default {
state,getters,mutations,actions
}

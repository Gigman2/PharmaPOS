import Vue from 'vue'
import Vuex from 'vuex'

import Account from './modules/auth'
import Hardware from './modules/hardware'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bucket: "http://localhost:4000/static/",
  },
  mutations: {
    SET_BUCKET: (state, value) => {
      state.bucket = value
    }
  },
  actions: {
  },
  getters: {
    GET_BUCKET: (state) => {
      return state.bucket
    }
  },
  modules: {
    Account,
    Hardware
  }
})

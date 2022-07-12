import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex); 

const state = {
    productId: '',
    vendorId: '',
    printer: {},
    barcode: {}
}

const mutations = {
    SET_BARCODE: (state, payload) => {
        state.barcode = payload
        if(payload !== undefined){
            if(payload.constructor === Array){
                payload = payload[0]
            }
            state.barcode = payload
            state.productId = payload.productId
            state.vendorId = payload.vendorId
        }
    },
    SET_PRINTER:(state, payload) => {
        state.printer = payload
    }
}

const actions = {
    GET_BARCODE: ({state, commit}) => {
        return new Promise((resolve, reject) => {
            axios.get('/barcode')
            .then(res => {
                let data =  res.data.result
                commit('SET_BARCODE', data)
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject()
            })
        })
    },

    GET_PRINTER: ({state, commit}) => {
        return new Promise((resolve, reject) => {
            axios.get('/printer')
            .then(res => {
                let data =  res.body.result
                commit('SET_PRINTER', data)
            })
            .catch((err) => {
                console.log(err)
                this.error = true
            })
        })
    }
}

const getters = {
    BARCODE_ONLINE_STATE: (state) =>{
        if (state.barcode !== undefined) {
            return true
        }
        return false
    },

    PRINTER_ONLINE_STATE: (state) =>{
        if(state.printer !== undefined){
            if(state.printer.attributes){
                if(!state.printer.attributes.includes('OFFLINE')){
                    return true
                }
            }
        }
        return false
    },
    GET_PRINTER:(state) => {
        if(state.printer === undefined){
            return null
        }
        return state.printer
    },
    GET_BARCODE:(state) => {
        if(state.barcode === undefined){
            return null
        }
        return state.barcode
    }
}

export default {
state,getters,mutations,actions
}

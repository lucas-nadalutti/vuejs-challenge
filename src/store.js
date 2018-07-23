import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    token: null,
    flash: {
        message: null,
        type: null
    }
  },
  mutations: {
    authenticate: (state, token) => {
        state.authenticated = true
        state.token = token
    },
    signOut: state => {
        state.authenticated = false
        state.token = null
    },
    setErrorFlash: (state, message) => {
        state.flash.message = message
        state.flash.type = 'danger'
    },
    setSuccessFlash: (state, message) => {
        state.flash.message = message
        state.flash.type = 'success'
    },
    resetFlash: state => {
        state.flash.message = null,
        state.flash.type = null
    }
  }
})
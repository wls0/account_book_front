import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'
import * as mutations from './mutations'
import * as actions from './actions'
import { getAuthCookie } from '../util/cookie'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: modules,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer: state => ({

      })
    })],
  state: {
    token: getAuthCookie(),
    msg: '',
    msgModal: false,
    cash: 0,
    costList: [],
    addAccountList: [],
    accountList: [],
    hyundai: 0,
    kb: 0,
    lotte: 0,
    samsung: 0,
    shinhan: 0,
    total: 0,
    woori: 0,
    revenue: 0
  },
  getters: {
    isLogin (state) {
      return state.token !== ''
    }
  },
  mutations,
  actions
})

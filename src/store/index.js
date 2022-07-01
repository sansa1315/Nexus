import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import {app} from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transactions:[],
    baseUrl:"http://63.135.170.173:5000/",
    userId:"799acffc-79be-4e6a-bb72-3865c5c91abe",
    selected:null
  },
  getters: {
  },
  mutations: {
    getTransaction:function (state) {
      axios.get(state.baseUrl + "transactions",{
        headers:{"Authorization": state.userId}
      }).then(response => {
        state.transactions = response.data.data        
      }).catch(e => {
        this.$buefy.toast.open({
          message: "something has gone wrong: " + e.response.data.errorMessage,
          type: 'is-danger',
          duration:5000
        })
      })
    },
    showDetail:function (state,transaction) {
      app.$router.push({
        name:"detail",
        params:{
          transaction
        }
      })
    },
    sortTransaction:function (state, order) {
      state.transactions.sort((a,b) => {
        if(a.concept > b.concept) return order == 'up' ? 1 : -1
        if(a.concept < b.concept) return order == 'up' ? -1 : 1        
        return 0
      })
    }
    
  },
  actions: {
    actionGetTransaction({commit}){
      commit('getTransaction');
    },
    actionShowDetail({commit}, transaction){
      commit('showDetail', transaction)
    },
    actionSortTransaction({commit}, order){
      commit('sortTransaction', order)
    }
    
  },
  modules: {
  }
})

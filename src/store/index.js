import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    cart: {
      carts: []
    },
    products: {}
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('CART', response.data.data)
          console.log(response.data.data)
        }
      })
    },
    removeCart (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true)
      axios.delete(api).then(response => {
        if (response.data.success) {
          context.commit('LOADING', false)
          context.dispatch('getCart')
        }
      })
    },
    addtoCart (context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      const cart = {
        product_id: id,
        qty
      }
      axios.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          context.dispatch('getCart')
          context.commit('LOADING', false)
        }
      })
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    CART (state, payload) {
      state.cart = payload
    }
  },
  modules: {
  }
})

import { createStore } from 'vuex'
export default createStore({
  state() {
    return {
      count: 100
    }
  },
  mutations: {
   setCount(state, value) {
      state.count = value
    }
  },
  getters: {
  
  },
  actions: {
    addAction(context) {
      context.commit('setCount', context.state.count + 1)
    },
    delAction(context) {
      context.commit('setCount', context.state.count - 1)
    }
  },
  modules: {
  }
})

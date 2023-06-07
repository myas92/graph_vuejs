import { createStore } from 'vuex'

export default createStore({
  state: {
    nodes: {},
    addUserModalVisible: false,
  },
  getters: {
  },
  mutations: {
    setNodes: function (state, payload) {
      state.nodes = payload
   },
   setAddUserModalVisible: function (state, payload) {
    state.addUserModalVisible = payload
 },
  },
  actions: {
  },
  modules: {
  }
})

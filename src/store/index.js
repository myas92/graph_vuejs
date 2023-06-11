import { createStore } from 'vuex'

export default createStore({
  state: {
    nodes: {},
    isVisibleAddNodeModal: false,
    isVisiblePersonProfile: false,
  },
  getters: {
  },
  mutations: {
    setNodes: function (state, payload) {
      state.nodes = payload
    },
    setAddUserModalVisible: function (state, payload) {
      state.isVisibleAddNodeModal = payload
    },
    setVisiblePersonProfile: function (state, payload) {
      state.isVisiblePersonProfile = payload
    },
  },
  actions: {
  },
  modules: {
  }
})

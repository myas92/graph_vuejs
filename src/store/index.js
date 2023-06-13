import { createStore } from 'vuex'

export default createStore({
  state: {
    nodes: {},
    isVisibleAddNodeModal: false,
    isVisiblePersonProfile: false,
    isVisibleAddEdgeModal: false,
    selectedNodes: {},
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
    setAddEdgeModalVisible: function (state, payload) {
      state.isVisibleAddEdgeModal = payload
    },
    setSelectedNodes: function (state, payload) {
      state.selectedNodes = payload
    },
  },
  actions: {
  },
  modules: {
  }
})

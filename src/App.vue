<template>
  <div class="demo-control-panel">
    <el-row :gutter="20">
      <div>
        <label>Node:</label>
        <el-button type="primary" @click="addUserModalVisibleHandler">add</el-button>
        <el-button
          type="danger"
          :disabled="selectedNodes.length == 0"
          @click="removeNode"
          >remove</el-button
        >
      </div>
      <div>
        <label>Edge:</label>
        <el-button
          type="primary"
          :disabled="selectedNodes.length != 2"
          @click="addEdge"
          >add</el-button
        >
        <el-button
          type="danger"
          :disabled="selectedEdges.length == 0"
          @click="removeEdge"
          >remove</el-button
        >
        <label>Action:</label>
        <el-button type="danger" @click="removeAllNodes"
          >remove all nodes</el-button
        >
        <el-button text @click="addUserModalVisibleHandler">
          open a Form nested Dialog
        </el-button>
        <AddUserModal v-if="addUserModalVisible"/>
      </div>
    </el-row>
  </div>

  <v-network-graph
    v-model:selected-nodes="selectedNodes"
    v-model:selected-edges="selectedEdges"
    :nodes="nodes"
    :edges="edges"
    :layouts="layouts"
    :configs="configs"
    class="main-box"
  />
</template>

<script>
// import { nodes, edges , layouts} from "./data";
import dataInfo from "./data";
import config from "./configs";
import get from "./requests/get";
import post from "./requests/post";
import remove from "./requests/remove";
import { extractNodes } from "../utils/extract-nodes";
import { extractEdges } from "../utils/extract-edges";
import AddUserModal from "./AddUserModal.vue";
export default {
  components: {
    AddUserModal,
  },
  data() {
    return {
      addUserModalVisible: false,
      nodes: {},
      edges: {},
      nextEdgeIndex: 0,
      nextNodeIndex: 0,
      layouts: dataInfo.layouts,
      configs: config.configs,
      selectedEdges: [],
      selectedNodes: [],
    };
  },
    computed: {
    checkUpdatedNodes() {
      return this.$store.state.nodes;
    },
    checkAddUserModal() {
      return this.$store.state.addUserModalVisible;
    },
  },
  watch: {
    checkUpdatedNodes() {
      this.nodes = this.$store.state.nodes
    },
    checkAddUserModal(){
      this.addUserModalVisible = this.$store.state.addUserModalVisible
    }
  },
  async created() {
    await this.getAllNodes();
    await this.getAllEdges();
  },
  methods: {
    async getAllNodes() {
      const { data: nodes } = await get(`api/users`);
      this.nodes = extractNodes(nodes);
      this.nextNodeIndex = Object.keys(this.nodes).length + 1;
      this.$store.commit('setNodes', this.nodes)
    },
    async getAllEdges() {
      const { data: edges } = await get(`api/relations`);
      this.edges = extractEdges(edges);
      this.nextEdgeIndex = Object.keys(this.edges).length + 1;
    },
    async addNode() {
      let { data: node } = await post("api/users", {
        name: Math.random().toString(36).slice(2), // Generate a random name
        personalId: Math.random().toString(36).slice(2), // Generate a random personalId
      });
      const nodeId = node.elementId;
      const name = node.properties.name;
      const personalId = node.properties.personalId;

      this.nodes[nodeId] = { name, personalId };
      this.nextNodeIndex++;
    },

    async removeNode() {
      for (const nodeId of this.selectedNodes) {
        await remove(`api/users/${nodeId}`);
        delete this.nodes[nodeId];
      }
    },

    async addEdge() {
      if (this.selectedNodes.length !== 2) return;
      const [source, target] = this.selectedNodes;
      let { data: edge } = await post("api/relations", {
        from: source,
        to: target,
      });
      const edgeId = edge[0]._fields[0].elementId;
      this.edges[edgeId] = { source, target };
      this.nextEdgeIndex++;
    },

    async removeEdge() {
      for (const edgeId of this.selectedEdges) {
        await remove(`api/relations/${edgeId}`);
        delete this.edges[edgeId];
      }
    },

    async removeAllNodes() {
      await remove(`api/users`);
      this.nodes = {};
      this.edges = {};
      this.nextEdgeIndex = 0;
      this.nextNodeIndex = 0;
    },
    addUserModalVisibleHandler(){
      this.$store.commit('setAddUserModalVisible', true)
    }
  },
};
</script>

<style>
.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
label {
  margin: 1rem;
}
.main-box {
  height: 1000px;
}
el-row {
  margin: 1rem;
}
</style>

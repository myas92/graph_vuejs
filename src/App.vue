<template>
  <div class="demo-control-panel">
    <div>
      <label>Node:</label>
      <el-button @click="addNode">add</el-button>
      <el-button :disabled="selectedNodes.length == 0" @click="removeNode"
        >remove</el-button
      >
    </div>
    <div>
      <label>Edge:</label>
      <el-button :disabled="selectedNodes.length != 2" @click="addEdge"
        >add</el-button
      >
      <el-button :disabled="selectedEdges.length == 0" @click="removeEdge"
        >remove</el-button
      >
    </div>
  </div>

  <v-network-graph
    v-model:selected-nodes="selectedNodes"
    v-model:selected-edges="selectedEdges"
    :nodes="nodes"
    :edges="edges"
    :layouts="layouts"
    :configs="configs"
  />
</template>

<script>
// import { nodes, edges , layouts} from "./data";
import { reactive, ref } from "vue";
import dataInfo  from "./data";
console.log(dataInfo)

export default {
  data() {
    return {
      nodes: { ...dataInfo.nodes },
      edges: { ...dataInfo.edges },
      nextEdgeIndex: Object.keys(dataInfo.edges).length + 1,
      nextNodeIndex: Object.keys(dataInfo.nodes).length + 1,
      layouts: dataInfo.layouts,
      configs: dataInfo.configs,
      selectedEdges: [],
      selectedNodes: [],
    };
  },
  created() {
    console.log("-----------------------------",this.nextNodeIndex);
  },
  methods: {
    addNode() {
      const nodeId = `node${this.nextNodeIndex}`;
      const name = `N${this.nextNodeIndex}`;
      this.nodes[nodeId] = { name };
      this.nextNodeIndex++;
    },

    removeNode() {
      for (const nodeId of selectedNodes) {
        delete this.nodes[nodeId];
      }
    },

    addEdge() {
      if (this.selectedNodes.length !== 2) return;
      const [source, target] = this.selectedNodes;
      const edgeId = `edge${this.nextEdgeIndex}`;
      this.edges[edgeId] = { source, target };
      this.nextEdgeIndex++;
    },

    removeEdge() {
      for (const edgeId of this.selectedEdges) {
        delete this.edges[edgeId];
      }
    },
  },
};
</script>

<style>
.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>

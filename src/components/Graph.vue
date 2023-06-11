<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="demo-control-panel" width="30%">
        <el-col class="m-1" :span="20">
          <el-row :gutter="10">
            <el-col :span="9">
            
              <el-button
                class="btn-100"
                type="primary"
                @click="addUserModalVisibleHandler"
              >
                Add Node
              </el-button>
            </el-col>
          </el-row>
        </el-col>

        <el-col class="m-1" :span="20">
          <el-row :gutter="10">
            <el-col :span="9">
              <el-button
                class="btn-100"
                type="primary"
                :disabled="selectedNodes.length != 2"
                @click="addEdge"
                >add</el-button
              >
            </el-col>
            <el-col :span="9">
              <el-button
                class="btn-100"
                type="danger"
                :disabled="selectedEdges.length == 0"
                @click="removeEdge"
                >remove</el-button
              >
            </el-col>
          </el-row>
        </el-col>

        <el-col class="m-1" :span="15">
          <el-button class="btn-100" type="danger" @click="removeAllNodes"
            >remove all nodes</el-button
          >
        </el-col>
        <el-col :span="15" class="m-1" v-if="selectedLabel == 'Person'">
          <div v-if="isVisiblePersonProfileComponent">
            <personal-profile :personalInfo="selectedInfo" />
          </div>
        </el-col>
      </el-aside>
      <el-container>

        <AddNodeModal v-if="isVisibleAddNodeModal" />
        <!-- <el-header>Header</el-header>
        <el-footer>Footer</el-footer> -->
        <el-main>
          <v-network-graph
            v-model:selected-nodes="selectedNodes"
            v-model:selected-edges="selectedEdges"
            :nodes="nodes"
            :edges="edges"
            :layouts="layouts"
            :configs="configs"
            :event-handlers="eventHandlers()"
            class="main-box"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>

  <div class="demo-control-panel"></div>
  <div></div>
</template>

<script>
// import { nodes, edges , layouts} from "./data";
import dataInfo from "../utils/data";
import config from "../utils/configs";
import get from "../requests/get";
import post from "../requests/post";
import remove from "../requests/remove";
import extractNodes from "../utils/extract-nodes";
import { extractEdges } from "../utils/extract-edges";
import AddNodeModal from "./AddNodeModal.vue";
import PersonalProfile from "./PersonProfile.vue";
export default {
  components: {
    AddNodeModal,
    PersonalProfile,
  },
  data() {
    return {
      isVisibleAddNodeModal: false,
      nodes: {},
      edges: {},
      nextEdgeIndex: 0,
      nextNodeIndex: 0,
      layouts: dataInfo.layouts,
      configs: config.configs,
      selectedEdges: [],
      selectedNodes: [],
      selectedInfo: {},
      selectedLabel: "",
      isVisiblePersonProfileComponent: false,
    };
  },
  computed: {
    checkUpdatedNodes() {
      return this.$store.state.nodes;
    },
    checkAddUserModal() {
      return this.$store.state.isVisibleAddNodeModal;
    },
    checkPersonProfileModal() {
      return this.$store.state.isVisiblePersonProfile;
    },
  },
  watch: {
    checkUpdatedNodes() {
      this.nodes = this.$store.state.nodes;
    },
    checkAddUserModal() {
      this.isVisibleAddNodeModal = this.$store.state.isVisibleAddNodeModal;
    },
    checkPersonProfileModal() {
      this.isVisiblePersonProfileComponent = this.$store.state.isVisiblePersonProfile;
    },
  },
  async created() {
    await this.getAllNodes();
    await this.getAllEdges();
  },
  methods: {
    eventHandlers() {
      return {
        "node:click": async ({ node }) => {
          this.$store.commit("setVisiblePersonProfile", true);
          // toggle
          let { data } = await get(`api/users/${node}`);
          let resNode = data[0]._fields[0];
          if (resNode.labels[0] == "Person") {
            this.selectedInfo = resNode.properties;
            this.selectedInfo.nodeId = resNode.elementId;
            this.selectedLabel = resNode.labels[0];
          }
        },
      };
    },
    async getAllNodes() {
      const { data: nodes } = await get(`api/nodes`);
      this.nodes = extractNodes(nodes);
      this.nextNodeIndex = Object.keys(this.nodes).length + 1;
      this.$store.commit("setNodes", this.nodes);
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
    addUserModalVisibleHandler() {
      this.$store.commit("setAddUserModalVisible", true);
    },
    setVisiblePersonProfileHandler() {
      this.$store.commit("setVisiblePersonProfile", true);
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
label {
  margin: 1rem;
}
.main-box {
  height: 1000px;
}
el-row {
  margin: 1rem;
}
el-col {
  margin: 1rem;
}

.m-1 {
  margin: 1rem;
}
.bg-red {
  background-color: rgb(184, 183, 183);
}
.btn-100 {
  width: 100% !important;
}
</style>

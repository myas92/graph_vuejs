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
                @click="addNodeModalVisibleHandler"
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
                @click="addEdgeModalVisibleHandler"
                >Add Relation</el-button
              >
            </el-col>
            <el-col :span="9">
              <el-button
                class="btn-100"
                type="danger"
                :disabled="selectedEdges.length == 0"
                @click="removeEdge"
                >Remove Relation</el-button
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
        <AddEdgeModal v-if="isVisibleAddEdgeModal" />
        <el-header>
          <el-col :span="8">
            <el-autocomplete
              v-model="inputSearch"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              clearable
              class="inline-input w-50"
              placeholder="Please Input"
              @select="handleSelectInSearchBox"
              @change="refresh"
            />
            <el-input-number
              v-model="deep"
              :min="1"
              :max="10"
              @change="deepSearchHandler"
              :disabled="inputSearch.length == 0"
            />
          </el-col>
        </el-header>
        <!-- <el-footer>Footer</el-footer> -->
        <el-main>
          <div class="tooltip-wrapper">
            <v-network-graph
              v-model:zoom-level="zoomLevel"
              v-model:selected-nodes="selectedNodes"
              v-model:selected-edges="selectedEdges"
              :nodes="nodes"
              :edges="edges"
              :configs="configs"
              :event-handlers="eventHandlers()"
              class="main-box"
            >
              <template #edge-label="{ edge, ...slotProps }">
                <v-edge-label
                  :text="edge.label"
                  align="center"
                  vertical-align="above"
                  v-bind="slotProps"
                />
              </template>
            </v-network-graph>

            <div
              ref="tooltip"
              class="tooltip"
              :style="{ opacity: tooltipOpacity }"
            >
              <div v-if="nodes[targetNodeId]?.nodeType == 'Person'">
                <div>Type: {{ nodes[targetNodeId]?.nodeType ?? "" }}</div>
                <div>Name: {{ nodes[targetNodeId]?.name ?? "" }}</div>
                <div>Full Name: {{ nodes[targetNodeId]?.fullName ?? "" }}</div>
                <div v-if="nodes[targetNodeId]?.team">
                  Team: {{ nodes[targetNodeId]?.team ?? "" }}
                </div>
              </div>
              <div
                v-else-if="nodes[targetNodeId]?.nodeType == 'VirtualMachine'"
              >
                <div>Type: {{ nodes[targetNodeId]?.nodeType ?? "" }}</div>
                <div>Name: {{ nodes[targetNodeId]?.name ?? "" }}</div>
                <div>Full Name: {{ nodes[targetNodeId]?.fullName ?? "" }}</div>
                <div>IP: {{ nodes[targetNodeId]?.ip ?? "" }}</div>
                <div>OS: {{ nodes[targetNodeId]?.os ?? "" }}</div>
                <div>
                  environment: {{ nodes[targetNodeId]?.environment ?? "" }}
                </div>
                <div>zone: {{ nodes[targetNodeId]?.zone ?? "" }}</div>
              </div>
              <div v-else>
                <div>Type: {{ nodes[targetNodeId]?.nodeType ?? "" }}</div>
                <div>Name: {{ nodes[targetNodeId]?.name ?? "" }}</div>
              </div>
            </div>
          </div>
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
import extractEdges from "../utils/extract-edges";
import extractNodesRelations from "../utils/extract-nodes-relations";
import AddNodeModal from "./node/AddNodeModal.vue";
import AddEdgeModal from "./edge/AddEdgeModal.vue";
import PersonalProfile from "./node/person/PersonProfile.vue";
import { Search } from "@element-plus/icons-vue";
import { markRaw } from "vue";
import {
  getRelationTypeModal,
  getTypeOfSourceTarget,
  isExistEdge,
  isUserSelectedNodes,
} from "../utils/nodes-utils";
export default {
  components: {
    AddNodeModal,
    PersonalProfile,
    Search,
    AddEdgeModal,
  },
  data() {
    return {
      targetNodeId: {},
      tooltipOpacity: 0,
      zoomLevel: 1.2,
      Search: markRaw(Search),
      inputSearch: "",
      isVisibleAddNodeModal: false,
      isVisibleAddEdgeModal: false,
      nodes: [],
      edges: [],
      nextEdgeIndex: 0,
      nextNodeIndex: 0,
      configs: config.configs,
      selectedEdges: [],
      selectedNodes: [],
      selectedInfo: {},
      selectedLabel: "",
      isVisiblePersonProfileComponent: false,
      deep: 1,
      nodeSearched: "",
    };
  },
  computed: {
    checkUpdatedNodes() {
      return this.$store.state.nodes;
    },
    checkUpdatedEdges() {
      return this.$store.state.edges;
    },
    checkAddNodeModal() {
      return this.$store.state.isVisibleAddNodeModal;
    },
    checkPersonProfileModal() {
      return this.$store.state.isVisiblePersonProfile;
    },
    checkEdgeModal() {
      return this.$store.state.isVisibleAddEdgeModal;
    },
  },
  watch: {
    checkUpdatedNodes() {
      this.nodes = this.$store.state.nodes;
    },
    checkUpdatedEdges() {
      this.edges = this.$store.state.edges;
      this.selectedNodes = [];
    },
    checkAddNodeModal() {
      this.isVisibleAddNodeModal = this.$store.state.isVisibleAddNodeModal;
    },
    checkPersonProfileModal() {
      this.isVisiblePersonProfileComponent =
        this.$store.state.isVisiblePersonProfile;
    },
    checkEdgeModal() {
      this.isVisibleAddEdgeModal = this.$store.state.isVisibleAddEdgeModal;
    },
  },
  async created() {
    await this.getAllNodes();
    await this.getAllEdges();
  },
  methods: {
    eventHandlers() {
      return {
        "node:dblclick": async ({ node }) => {
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
        "node:click": async ({ node }) => {
          await this.clickOnNodeHandler(node);
        },
        "node:pointerover": ({ node }) => {
          this.targetNodeId = node;
          this.tooltipOpacity = 1; // show
        },
        "node:pointerout": (_) => {
          this.tooltipOpacity = 0; // hide
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
      this.$store.commit("setEdges", this.edges);
    },

    async removeNode() {
      for (const nodeId of this.selectedNodes) {
        await remove(`api/users/${nodeId}`);
        delete this.nodes[nodeId];
      }
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
    addNodeModalVisibleHandler() {
      this.$store.commit("setAddUserModalVisible", true);
    },
    addEdgeModalVisibleHandler() {
      if (!isExistEdge(this.edges, this.selectedNodes)) {
        if (!isUserSelectedNodes(this.nodes, this.selectedNodes)) {
          let { sourceType, targetType } = getTypeOfSourceTarget(
            this.nodes,
            this.selectedNodes
          );
          let ModalType = getRelationTypeModal({ sourceType, targetType });
          if (ModalType == "PersonToProject") {
            this.$store.commit("setAddEdgeModalVisible", true);
            this.$store.commit("setSelectedNodes", this.selectedNodes);
          }
        } else {
          console.log("Relation between two person is not possible");
          return;
        }
      } else {
        console.log("Relation is exist");
        this.selectedNodes = [];
        return;
      }
    },
    setVisiblePersonProfileHandler() {
      this.$store.commit("setVisiblePersonProfile", true);
    },
    setSelectedEdgeHandler() {},

    async querySearch(queryString) {
      if (queryString == "") {
        // await this.getAllNodes();
        // await this.getAllEdges();
      }
      const { data: nodes } = await get(
        `api/nodes/search?input=${queryString}`
      );
      let result = [];
      let preRes = {
        Person: [],
        Project: [],
        VirtualMachine: [],
      };
      nodes.map((node) => {
        let currNode = node._fields[0];
        const elementId = currNode.elementId;
        const name = currNode.properties.name;
        const label = currNode.labels[0];
        preRes[label].push({
          value: `${name}:${label}`,
          elementId: elementId,
        });
        let obj = {
          value: `${name}:${label}`,
          elementId: elementId,
        };
        result.push(obj);
      });
      return [...preRes["Person"], ...preRes["Project"], ...preRes["VirtualMachine"]];
    },

    async handleSelectInSearchBox(item) {
      console.log(item);
      let response;
      this.nodeSearched = item;
      this.inputSearch = item.value.split(":")[0];
      response = await get(`api/nodes/${item.elementId}/deep/1`);

      if (response.data.length == 0) {
        response = await get(`api/nodes/${item.elementId}`);
        this.nodes = extractNodes(response.data);
        this.edges = {};
      } else {
        let { nodes, edges } = extractNodesRelations(response.data);
        this.nodes = nodes;
        this.edges = edges;
      }
      this.$store.commit("setNodes", this.nodes);
    },
    async deepSearchHandler(item) {
      const { data: response } = await get(
        `api/nodes/${this.nodeSearched.elementId}/deep/${item}`
      );
      let { nodes, edges } = extractNodesRelations(response);
      this.nodes = nodes;
      this.edges = edges;
      this.$store.commit("setNodes", this.nodes);
    },

    async refresh() {
      // await this.getAllNodes();
      // await this.getAllEdges();
    },
    async clickOnNodeHandler(node) {
      if (this.nodes[node]?.nodeType == "VirtualMachine") {
        const { data: response } = await get(
          `api/nodes/${node}/deep/1?nodeType=VirtualMachine`
        );

        let { nodes, edges } = extractNodesRelations(response);
        for (const key in nodes) {
          this.nodes[key] = nodes[key];
        }
        for (const key in edges) {
          this.edges[key] = edges[key];
        }

        this.$store.commit("setNodes", this.nodes);
        this.$store.commit("setEdges", this.edges);
      }

      if (this.nodes[node]?.nodeType == "Project") {
        const { data: response } = await get(
          `api/nodes/${node}/deep/1?nodeType=Project`
        );

        let { nodes, edges } = extractNodesRelations(response);
        for (const key in nodes) {
          this.nodes[key] = nodes[key];
        }
        for (const key in edges) {
          this.edges[key] = edges[key];
        }

        this.$store.commit("setNodes", this.nodes);
        this.$store.commit("setEdges", this.edges);
      }
    },
  },
};
</script>

<style lang="css">
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

.tooltip-wrapper {
  position: relative;
}
.tooltip {
  top: 0px !important;
  right: 0px !important;
  opacity: 0;
  position: absolute;
  width: 400px;
  padding: 10px;
  display: grid;
  place-content: top;
  text-align: left;
  font-size: 1.2rem;
  background-color: #1fab89;
  border-radius: 4px;
  color: #ffffff;
  transition: opacity 0.2s linear;
  pointer-events: none;
}
    svg{
        background-color: #dddddd;
        transform: scale(0.99);
    }
</style>

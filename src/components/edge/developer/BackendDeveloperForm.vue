<template>
  <el-form
    label-position="left"
    label-width="100px"
    style="max-width: 460px"
    :model="form"
    @keyup.enter="addEdge"
  >
    <el-form-item label="description">
      <el-input v-model="form.description" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Level">
      <el-select v-model="form.level" placeholder="please select level">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <span class="dialog-footer">
    <el-button
      @click="addEdgeModalVisibleHandler"
      @keyup.esc="addEdgeModalVisibleHandler"
      >Cancel</el-button
    >
    <el-button type="primary" @click="addEdge"> Confirm </el-button>
  </span>
</template>

<script>
import post from "../../../requests/post";
import { NODES_CONFIG } from "../../../helpers/nodes-config";
import { COLOR_TEAM } from "@/helpers/color-team";
export default {
  name: "BackendDeveloperForm",
  props: {
    label: {
      type: String,
      default: "Backend Developer",
    },
  },
  data() {
    return {
      modalVisible: true,
      form: {
        description: "",
        lever: "",
      },
      options: [
        {
          value: "1",
          label: "level 1",
        },
        {
          value: "2",
          label: "level 2",
        },
        {
          value: "3",
          label: "level 3",
        },
      ],
    };
  },
  async created() {},
  methods: {
    async addEdge() {
      const [source, target] = this.$store.state.selectedNodes;
      let { data: edge } = await post("api/relations", {
        from: source,
        to: target,
        label: this.label,
        meta: this.form,
      });
      const edgeId = edge[0]._fields[0].elementId;
      // this.edges[edgeId] = { source, target };
      // this.nextEdgeIndex++;
      // let { data } = await post("api/users", {
      //   name: name != "" ? name : Math.random().toString(36).slice(2),
      //   personalId: personalId,
      //   team: team
      // });
      // node = data;
      // const nodeId = node.elementId;
      // nodes = this.$store.state.nodes;
      // nodes[nodeId] = {
      //   ...node.properties,
      //   ...NODES_CONFIG[nodeType],
      //    color: COLOR_TEAM[team]
      // };

      // this.$store.commit("setNodes", nodes);
      this.$store.commit("setAddEdgeModalVisible", false);
    },
    addEdgeModalVisibleHandler() {
      this.$store.commit("setAddEdgeModalVisible", false);
    },
    handleFocusOut() {
      this.$store.commit("setAddEdgeModalVisible", false);
    },
  },
};
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

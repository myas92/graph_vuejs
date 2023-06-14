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
export default {
  name: "FrontendDeveloperForm",
  props: {
    label: {
      type: String,
      default: "Frontend Developer",
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
      const edges = this.$store.state.edges;
      edges[edgeId] = { source, target, label: this.label};
      this.$store.commit("setEdges", edges);
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

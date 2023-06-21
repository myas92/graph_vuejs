<template>
  <el-form
      label-position="left"
    label-width="100px"
    style="max-width: 460px"
  :model="form" @keyup.enter="addNode">
    <el-form-item label="name">
      <el-input v-model="form.name" autocomplete="off" />
    </el-form-item>
    <el-form-item label="description">
      <el-input v-model="form.description" autocomplete="off" />
    </el-form-item>
    <el-form-item label="link">
      <el-input v-model="form.link" autocomplete="off" />
    </el-form-item>
  </el-form>
  <span class="dialog-footer">
    <el-button
      @click="addUserModalVisibleHandler"
      @keyup.esc="addUserModalVisibleHandler"
      >Cancel</el-button
    >
    <el-button type="primary" @click="addNode"> Confirm </el-button>
  </span>
</template>

<script>
import post from "../../../requests/post";
import { NODES_CONFIG } from "../../../helpers/nodes-config";
export default {
  name: "PersonForm",
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      modalVisible: true,
      form: {
        name: "",
        description: "",
        link: "",
      },
    };
  },
  methods: {
    async addNode() {
      let nodeType = "Project";
      let nodes;
      let node;
      const { name, description, link } = this.form;
      let { data } = await post("api/projects", {
        name: name != "" ? name : Math.random().toString(36).slice(2),
        description,
        link,
      });
      node = data;
      const nodeId = node.elementId;
      nodes = this.$store.state.nodes;
      nodes[nodeId] = {
        nodeType,
        ...node.properties,
        ...NODES_CONFIG[nodeType],
      };
      this.$store.commit("setNodes", nodes);
      this.$store.commit("setAddUserModalVisible", false);
    },
    addUserModalVisibleHandler() {
      this.$store.commit("setAddUserModalVisible", false);
    },
    handleFocusOut() {
      this.$store.commit("setAddUserModalVisible", false);
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
</style>

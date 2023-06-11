<template>
  <el-form :model="form" @keyup.enter="addNode">
    <el-form-item label="name">
      <el-input v-model="form.name" autocomplete="off" />
    </el-form-item>
    <el-form-item label="personal Id">
      <el-input v-model="form.personalId" autocomplete="off" />
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
import post from "../requests/post";
import { NODES_CONFIG } from "../helpers/nodes-config";
export default {
  name: "PersonForm",
  data() {
    return {
      modalVisible: true,
      form: {
        name: "",
        personalId: "",
      },
    };
  },
  async created() {},
  methods: {
    async addNode() {
      let nodeType = "Person";
      let nodes;
      let node;
      const { name, personalId } = this.form;
      let { data } = await post("api/users", {
        name: name != "" ? name : Math.random().toString(36).slice(2),
        personalId: personalId,
      });
      node = data;
      const nodeId = node.elementId;
      nodes = this.$store.state.nodes;
      nodes[nodeId] = {
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
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

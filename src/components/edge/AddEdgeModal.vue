<template>
  <el-dialog
    v-model="modalVisible"
    title="Add Relation"
    :before-close="addEdgeModalVisibleHandler"
  >
    <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
      :model="form"
    >
      <el-form-item label="Type Entity">
        <el-select v-model="form.edge" placeholder="Please select a type">
          <el-option
            v-for="item in edgeTypesUserProject"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div v-if="form.edge == 'Backend Developer'">
        <BackendDeveloperForm :label="form.edge" />
      </div>
      <div v-if="form.edge == 'Frontend Developer'">
        <FrontendDeveloperForm :label="form.edge" />
      </div>
    </el-form>
    <slot></slot>
  </el-dialog>
</template>

<script>
import BackendDeveloperForm from "./developer/BackendDeveloperForm.vue";
import FrontendDeveloperForm from "./developer/FrontendDeveloperForm.vue";
import { EDGE_TYPES_USER_PROJECT } from "../../helpers/edges-types-user-project";
export default {
  name: "EdgeSelectorComponent",
  components: {
    BackendDeveloperForm,
    FrontendDeveloperForm
  },
  data() {
    return {
      modalVisible: true,
      edgeTypesUserProject: EDGE_TYPES_USER_PROJECT,
      form: {
        edge: "",
      },
    };
  },
  methods: {
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
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

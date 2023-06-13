<template>
  <el-dialog
    v-model="modalVisible"
    title="Add Relation"
    :before-close="addEdgeModalVisibleHandler"
  >
    <el-form       
    label-position="left"
    label-width="100px"
    style="max-width: 460px" :model="form">
      <el-form-item label="Type Entity">
        <el-select v-model="form.edge" placeholder="Please select a type">
          <el-option label="Backend Developer" value="Backend Developer" />
          <el-option label="Frontend Developer" value="FrontendDeveloper" />
          <el-option label="Network Technical Support" value="NetworkTechnicalSupport" />
          <el-option label="Network Engineer" value="NetworkEngineer" />
          <el-option label="DevOps Technical Support" value="DevOpsTechnicalSupport" />
          <el-option label="DevOps Engineer" value="DevOpsEngineer" />
          <el-option label="Security Technical Support" value="DevOpsTechnicalSupport" />
          <el-option label="Security Engineer" value="SecurityEngineer" />
          <el-option label="Project Manager" value="ProjectManager" />
          <el-option label="Product Manager" value="ProjectManager" />
          <el-option label="UI/UX Designer" value="Designer" />
          <el-option label="Database Administrator" value="DatabaseAdministrator" />
          <el-option label="Quality Assurance" value="QualityAssurance" />
          <el-option label="Data Scientist" value="DataScientist" />
          <el-option label="Technical Writer" value="TechnicalWriter" />
          <el-option label="System Administrator" value="SystemAdministrator" />
        </el-select>
      </el-form-item>
      <div v-if="form.edge == 'Backend Developer'">
        <BackendDeveloperForm :label="form.edge" />
      </div>
      <!-- <div v-if="form.edge == 'FrontendDeveloper'">
        <ProjectForm />
      </div> -->
      <!-- <div v-if="form.edge == 'Service'">
        <el-form-item label="Service Name">
          <el-input v-model="form.service.name" autocomplete="off" />
        </el-form-item>
      </div> -->
    </el-form>
    <slot></slot>
  </el-dialog>
</template>

<script>
import BackendDeveloperForm from './developer/BackendDeveloperForm.vue'
export default {
  name: "EdgeSelectorComponent",
  components: {
    BackendDeveloperForm,
  },
  data() {
    return {
      modalVisible: true,
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

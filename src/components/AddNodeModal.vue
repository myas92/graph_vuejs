<template>
  <el-dialog
    v-model="modalVisible"
    title="Add Node"
    :before-close="addUserModalVisibleHandler"
  >
    <el-form       label-position="left"
    label-width="100px"
    style="max-width: 460px" :model="form">
      <el-form-item label="Type Entity">
        <el-select v-model="form.node" placeholder="Please select a type">
          <el-option label="Person" value="Person" />
          <el-option label="Project" value="Project" />
          <el-option label="Service" value="Service" />
          <el-option label="Physical Server" value="physical_server" />
          <el-option label="Virtual Server" value="virtual_server" />
        </el-select>
      </el-form-item>
      <div v-if="form.node == 'Person'">
        <PersonForm/>
      </div>
      <div v-if="form.node == 'Project'">
        <ProjectForm />
      </div>
      <!-- <div v-if="form.node == 'Service'">
        <el-form-item label="Service Name">
          <el-input v-model="form.service.name" autocomplete="off" />
        </el-form-item>
      </div> -->
    </el-form>
    <slot></slot>
  </el-dialog>
</template>

<script>
import PersonForm from './PersonForm.vue'
import ProjectForm from './ProjectForm.vue'
export default {
  name: "MyComponent",
  components: {
    PersonForm,
    ProjectForm
  },
  data() {
    return {
      modalVisible: true,
      form: {
        node: "",
      },
    };
  },
  async created() {
    console.log("test");
  },
  methods: {
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

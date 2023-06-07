<template>
  <el-dialog
    v-model="modalVisible"
    title="Add Node"
    :before-close="addUserModalVisibleHandler"
    @keyup.enter="addUser"
  >
    <el-form :model="form">
      <el-form-item label="Type Entity">
        <el-select v-model="form.node" placeholder="Please select a type">
          <el-option label="Person" value="person" />
          <el-option label="Project" value="project" />
          <el-option label="Service" value="Service" />
          <el-option label="Physical Server" value="physical_server" />
          <el-option label="Virtual Server" value="virtual_server" />
        </el-select>
      </el-form-item>
      <div v-if="form.node == 'person'">
        <el-form-item label="name">
          <el-input v-model="form.person.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="personal Id">
          <el-input v-model="form.person.personalId" autocomplete="off" />
        </el-form-item>
      </div>
      <div v-if="form.node == 'Service'">
        <el-form-item label="Service Name">
          <el-input v-model="form.service.name" autocomplete="off" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addUserModalVisibleHandler"  @keyup.esc="addUserModalVisibleHandler">Cancel</el-button>
        <el-button type="primary" @click="addUser" > Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import post from "./requests/post";

export default {
  name: "MyComponent",
  data() {
    return {
      modalVisible: true,
      form: {
        person: {
          name: "",
          personalId: "",
        },
        service: {
          name: "",
        },
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        node: "",
        resource: "",
        desc: "",
      },
    };
  },
  async created() {
    console.log("test");
  },
  methods: {
    async addUser() {
      if(this.form.node==''){
        this.$store.commit("setAddUserModalVisible", false);
        return null
      }
      let node;
      console.log(this.form[this.form.node]);
      console.log("--------------Hi in Modal Add USer-----------------");
      if (this.form.node == "person") {
        const { name, personalId } = this.form[this.form.node];
        let { data } = await post("api/users", {
          name: name != "" ? name : Math.random().toString(36).slice(2), // Generate a random name
          personalId:
            personalId != "" ? personalId : Math.random().toString(36).slice(2), // Generate a random personalId
        });
        node = data;
      }

      const nodeId = node.elementId;
      const name = node.properties.name;
      const personalId = node.properties.personalId;
      let nodes = this.$store.state.nodes;
      nodes[nodeId] = { name, personalId };
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

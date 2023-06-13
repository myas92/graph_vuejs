<template>
  <el-form
    label-position="left"
    label-width="100px"
    style="max-width: 460px"
    :model="personalInfo"
    @keyup.enter="updateNodeHandler"
  >
    <el-form-item label="name">
      <el-input v-model="personalInfo.name" autocomplete="off" />
    </el-form-item>
    <el-form-item label="personal Id">
      <el-input v-model="personalInfo.personalId" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="personalInfo.team" placeholder="please select your zone">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-space wrap>
      <el-button type="primary" @click="updateNodeHandler"> Update </el-button>
      <el-button type="danger" :disabled="false" @click="removeNodeHandler">
        Remove
      </el-button>
    </el-space>
  </el-form>
</template>

<script>
import remove from "../../../requests/remove";
import put from "../../../requests/put";
import { NODES_CONFIG } from "../../../helpers/nodes-config";
import { COLOR_TEAM } from '@/helpers/color-team';
export default {
  name: "PersonForm",
  props: {
    personalInfo: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      isVisibleComponent: false,
      options: [
        {
          value: "network",
          label: "Network",
        },
        {
          value: "devops",
          label: "Devops",
        },
      ],
    };
  },
  async created() {},
  methods: {
    async updateNodeHandler() {
      let nodeType = "Person";
      let nodes;
      let node;
      const { name, personalId, nodeId, team } = this.personalInfo;
      let { data } = await put(`api/users/${nodeId}`, {
        name: name,
        personalId: personalId,
        team: team,
      });
      node = data;
      nodes = this.$store.state.nodes;
      nodes[nodeId] = {
        ...node.properties,
        ...NODES_CONFIG[nodeType],
        color: COLOR_TEAM[team]
      };
      this.$store.commit("setNodes", nodes);
    },

    async removeNodeHandler() {
      const { nodeId } = this.personalInfo;
      await remove(`api/users/${nodeId}`);

      let nodes = this.$store.state.nodes;
      delete nodes[nodeId];
      this.$store.commit("setNodes", nodes);
      this.isVis = false;
      this.$store.commit("setVisiblePersonProfile", false);
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

import { defineConfigs } from "v-network-graph"
const nodes = {
    node1: { name: "N1" },
    node2: { name: "N2" },
    node3: { name: "N3" },
  }
  
  const edges = {
    edge1: { source: "node1", target: "node2" },
    edge2: { source: "node2", target: "node3" },
  }
  
  const layouts = {
    nodes: {
      node1: { x: 50, y: 0 },
      node2: { x: 0, y: 75 },
      node3: { x: 100, y: 75 },
    },
  }
  
  const configs = defineConfigs({
    node: {
      selectable: 2, // up to 2 nodes
    },
    edge: {
      selectable: true,
      normal: {
        width: 3,
      },
    },
  })
  

// exports.nodes = nodes;
// exports.edges = edges;
// exports.layouts = layouts;
// exports.configs = configs;

export default {
    nodes,
    edges,
    layouts,
    configs,
  }
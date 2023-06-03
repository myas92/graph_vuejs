import { defineConfigs } from "v-network-graph"
import { ForceLayout } from "v-network-graph/lib/force-layout";
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
    view: {
        layoutHandler: new ForceLayout({
            //   positionFixedByDrag: false,
            //   positionFixedByClickWithAltKey: true,
            //   createSimulation: (d3, nodes, edges) => {
            //     // d3-force parameters
            //     const forceLink = d3.forceLink(edges).id(d => d.id)
            // return d3
            //   .forceSimulation(nodes)
            //   .force("edge", forceLink.distance(40).strength(0.5))
            //   .force("charge", d3.forceManyBody().strength(-800))
            //   .force("center", d3.forceCenter().strength(0.05))
            //   .alphaMin(0.001)

            // * The following are the default parameters for the simulation.
            // const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id(d => d.id)
            // return d3
            //   .forceSimulation(nodes)
            //   .force("edge", forceLink.distance(100))
            //   .force("charge", d3.forceManyBody())
            //   .force("collide", d3.forceCollide(50).strength(0.2))
            //   .force("center", d3.forceCenter().strength(0.05))
            //   .alphaMin(0.001)
            //   }
        })
    },
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
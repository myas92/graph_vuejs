import { defineConfigs } from "v-network-graph"
import { ForceLayout } from "v-network-graph/lib/force-layout";

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
        selectable: 3, // up to 2 nodes
    },
    edge: {
        selectable: true,
        normal: {
            width: 3,
        },
    },
});


export default { configs }
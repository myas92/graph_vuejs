import { defineConfigs } from "v-network-graph"
import { ForceLayout } from "v-network-graph/lib/force-layout";
import ColorConvert from "color-convert"
const configs = defineConfigs({
    view: {
        scalingObjects: true,
        minZoomLevel: 0.1,
        maxZoomLevel: 16,
        layoutHandler: new ForceLayout({
            positionFixedByDrag: false,
            positionFixedByClickWithAltKey: true,
            createSimulation: (d3, nodes, edges) => {
              // d3-force parameters
              const forceLink = d3.forceLink(edges).id(d => d.id)
              return d3
                .forceSimulation(nodes)
                .force("edge", forceLink.distance(150).strength(0.5))
                .force("charge", d3.forceManyBody().strength(-800))
                .force("center", d3.forceCenter().strength(0.05))
                .alphaMin(0.01)
    
        //         // * The following are the default parameters for the simulation.
        //         // const forceLink = d3.forceLink(edges).id(d => d.id)
        //         // return d3
        //         //   .forceSimulation(nodes)
        //         //   .force("edge", forceLink.distance(100))
        //         //   .force("charge", d3.forceManyBody())
        //         //   .force("collide", d3.forceCollide(50).strength(0.2))
        //         //   .force("center", d3.forceCenter().strength(0.05))
        //         //   .alphaMin(0.001)


            }
          })
    },
    node: {
        selectable: 2,
        label: {
            visible: true,
            direction: "south",
            directionAutoAdjustment: true,
        },
        normal: {
            type: node => node.type,
            color: node => node.color,
            width: node => node.width,
            strokeWidth: 2,
            strokeColor: n => darker(n.color, 20),
        }
    },
    edge: {
        selectable: true,
        gap: 10,
        normal: {
            width: 2,
        },
    },
});


function darker(hex, level) {
    const hsv = ColorConvert.hex.hsv(hex)
    hsv[2] -= level
    return "#" + ColorConvert.hsv.hex(hsv)
}
export default { configs }
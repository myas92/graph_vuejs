import { defineConfigs, GridLayout } from "v-network-graph"
import { ForceLayout } from "v-network-graph/lib/force-layout";
import ColorConvert from "color-convert"
const configs = defineConfigs({
    view: {
        scalingObjects: true,
        minZoomLevel: 0.1,
        maxZoomLevel: 6,
        layoutHandler: new ForceLayout({
            positionFixedByDrag: false,
            positionFixedByClickWithAltKey: true,
            createSimulation: (d3, nodes, edges) => {
                // d3-force parameters
                const forceLink = d3.forceLink(edges).id(d => d.id)
                return d3
                    .forceSimulation(nodes)
                    // .force("edge", forceLink.distance(150).strength(0.5))
                    .force("edge", forceLink.distance(50).strength(0.5))
                    .force("charge", d3.forceManyBody().strength(-100))
                    .force("center", d3.forceCenter().strength(0.01))
                    .alphaMin(0.01)

                // .forceSimulation(nodes)
                // .force("edge", forceLink.distance(40).strength(0.5))
                // .force("charge", d3.forceManyBody().strength(-800))
                // .force("center", d3.forceCenter().strength(0.05))
                // .alphaMin(0.001)
            }
        })
    },
    node: {
        selectable: 2,
        label: {
            visible: true,
            direction: "center",
            // directionAutoAdjustment: true,
            fontSize: 7,
        },
        normal: {
            type: node => node.type,
            color: node => node.color,
            width: node => node.width,
            height: node => node.height,
            strokeWidth: 2,
            strokeColor: node => darker(node.color, 20),
            radius: node=>node.radius,
        },
        hover: {
            color: node => darker(node.color, 10),
            strokeColor: node => darker(node.color, 30),
          },
    },
    edge: {
        label: {
            visible: true,
            direction: "south",
            // directionAutoAdjustment: true,
            fontSize: 8,
        },
        selectable: true,
        gap: 10,
        type: "curve",
        color: "#0F4C75",
        normal: {
            width: 1,
        },
    },
});


function darker(hex='339FFF', level) {
    const hsv = ColorConvert.hex.hsv(hex)
    hsv[2] -= level
    return "#" + ColorConvert.hsv.hex(hsv)
}
export default { configs }
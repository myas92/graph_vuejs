import { defineConfigs } from "v-network-graph"
import { ForceLayout } from "v-network-graph/lib/force-layout";
import ColorConvert from "color-convert"
const configs = defineConfigs({
    view: {
        scalingObjects: true,
        minZoomLevel: 0.1,
        maxZoomLevel: 16,
        layoutHandler: new ForceLayout({
        })
    },
    node: {
        selectable: 2,
        normal: {
            type: node => node.type,
            color: node => node.color,
            width: node => node.width,
            strokeWidth: 3,
            strokeColor: n => darker(n.color, 20),
        }
    },
    edge: {
        selectable: true,
        normal: {
            width: 3,
        },
    },
});


function darker(hex, level) {
    const hsv = ColorConvert.hex.hsv(hex)
    hsv[2] -= level
    return "#" + ColorConvert.hsv.hex(hsv)
}
export default { configs }
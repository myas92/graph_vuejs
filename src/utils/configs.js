import { defineConfigs } from "v-network-graph"
import { ForceLayout } from "v-network-graph/lib/force-layout";

const configs = defineConfigs({
    view: {
        layoutHandler: new ForceLayout({
        })
    },
    node: {
        selectable: 2, 
        normal: {
            type: node => node.type,
            color: node => node.color,
            width: node => node.width
          }
    },
    edge: {
        selectable: true,
        normal: {
            width: 3,
        },
    },
});

export default { configs }
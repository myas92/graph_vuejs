import { COLOR_TEAM } from "@/helpers/color-team";
import { NODES_CONFIG } from "../helpers/nodes-config";

function setNodeIntoNodes(nodes, node) {
    if (node.labels[0] == 'Person') {
        nodes[`${node.elementId}`] = {
            nodeType: node.labels[0],
            name: `${node.properties.name}`,
            ...node.properties,
            ...NODES_CONFIG[node.labels[0]],
            color: COLOR_TEAM[node.properties.team]
        }
    }
    else if (node.labels[0] == 'Project') {
        nodes[`${node.elementId}`] = {
            nodeType: node.labels[0],
            name: `${node.properties.name}`,
            ...node.properties,
            ...NODES_CONFIG[node.labels[0]],

        }
    }

    return nodes
}

export default setNodeIntoNodes
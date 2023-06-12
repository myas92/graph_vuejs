import { COLOR_TEAM } from "@/helpers/color-team";
import { NODES_CONFIG } from "../helpers/nodes-config";

function setNodeIntoNodes (nodes, node){
    if (node.labels[0] == 'Person') {
        nodes[`${node.elementId}`] = {
            name: `${node.properties.name}`,
            personalId: `${node.properties.personalId}`,
            ...NODES_CONFIG[node.labels[0]],
            color: COLOR_TEAM[node.properties.team]
        }
    }
    else if (node.labels[0] == 'Project') {
        nodes[`${node.elementId}`] = {
            name: `${node.properties.name}`,
            description: `${node.properties.description}`,
            link: `${node.properties.link}`,
            ...NODES_CONFIG[node.labels[0]],
    
        }
    }

    return nodes
}

export default setNodeIntoNodes
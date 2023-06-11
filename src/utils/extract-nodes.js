import { NODES_CONFIG } from "../helpers/nodes-config";
const extractNodes = (neoNodes) => {
    let nodes = {}
    neoNodes.map((node, index) => {
        if (node._fields[0].labels[0] == 'Person') {
            nodes[`${node._fields[0].elementId}`] = {
                name: `${node._fields[0].properties.name}`,
                personalId: `${node._fields[0].properties.personalId}`,
                ...NODES_CONFIG[node._fields[0].labels[0]]
            }
        }
        else if (node._fields[0].labels[0] == 'Project') {
            nodes[`${node._fields[0].elementId}`] = {
                name: `${node._fields[0].properties.name}`,
                description: `${node._fields[0].properties.description}`,
                link: `${node._fields[0].properties.link}`,
                ...NODES_CONFIG[node._fields[0].labels[0]],

            }
        }

    })

    return nodes;

}


export default extractNodes;

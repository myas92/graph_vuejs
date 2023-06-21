import { COLOR_TEAM } from "@/helpers/color-team";
import { NODES_CONFIG } from "../helpers/nodes-config";

function setNodeIntoNodes(nodes, node) {
    if (node.labels[0] == 'Person') {
        let abbrName = getAbbrNameForPerson(node.properties.name);
        let fullName = node.properties.name
        delete node.properties.name
        nodes[`${node.elementId}`] = {
            nodeType: node.labels[0],
            name: abbrName,
            fullName: fullName,
            ...node.properties,
            ...NODES_CONFIG[node.labels[0]],
            color: COLOR_TEAM[node.properties.team || 'network']
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
    else if (node.labels[0] == 'VirtualMachine') {
        let {abbrName} = getAbbrNameForVirtualMachine(node.properties.name)
        let fullName = node.properties.name
        delete node.properties.name
        nodes[`${node.elementId}`] = {
            nodeType: node.labels[0],
            name: abbrName,
            fullName: fullName,
            ...node.properties,
            ...NODES_CONFIG[node.labels[0]],

        }
    }

    return nodes
}


function getAbbrNameForVirtualMachine(name){
    // return name.replace(/.psg.network/,'')
    let vmInfo = name.split(/(?:-|\.)+/);
    if(vmInfo.length==6){
        return {
            abbrName: `${vmInfo[0][0].toUpperCase()}-${vmInfo[1]}`,
            projectName:vmInfo[0],
            subProject: '',
            id: vmInfo[1],
            environment: vmInfo[2],
            zone: vmInfo[3]
        }
    }else {
        return {
            abbrName: `${vmInfo[0][0].toUpperCase()}-${vmInfo[1]}-${vmInfo[2]}`,
            projectName:vmInfo[0],
            subProject: vmInfo[1],
            id: vmInfo[2],
            environment: vmInfo[3],
            zone: vmInfo[4]
        }
    }
}
function getAbbrNameForPerson(name){
    let splitName = name.split(".");
    if(splitName.length == 2){
        // return splitName[1]
        return `${splitName[0][0].toUpperCase()}.${splitName[1][0].toUpperCase()}`
    }
    else{
        return `${splitName[0][0].toUpperCase()}.${splitName[0][1].toUpperCase()}`
    }
}
export default setNodeIntoNodes
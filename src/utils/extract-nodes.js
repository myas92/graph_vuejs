import setNodeIntoNodes from "./set-node-into-nodes";
const extractNodes = (neoNodes) => {
    let nodes = {}
    neoNodes.map((neoNode) => {
        nodes = setNodeIntoNodes(nodes, neoNode._fields[0])
    })

    return nodes;

}


export default extractNodes;

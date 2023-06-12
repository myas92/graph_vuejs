import setNodeIntoNodes from "./set-node-into-nodes";
import setEdgeIntoEdges from"./set-edge-into-edges";
const extractNodesRelations = (neoNodes) => {
    let nodes = {}
    let edges = {}
    neoNodes.map((neoNode) => {
        for (let i = 0; i < neoNode._fields[0].length; i++) {
            edges = setEdgeIntoEdges(edges, neoNode._fields[0][i])
        }

        for (let i = 1; i < neoNode._fields.length; i++) {
            nodes = setNodeIntoNodes(nodes, neoNode._fields[i])
        }
    })
    return { nodes, edges };
}


export default extractNodesRelations;

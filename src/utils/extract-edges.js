import setEdgeIntoEdges from"./set-edge-into-edges";
const extractEdges = (neoEdges) => {
    let edges= {}
    neoEdges.map((edge)=>{
        edges = setEdgeIntoEdges(edges, edge._fields[0])
    })

    return edges;
    
}

export default extractEdges
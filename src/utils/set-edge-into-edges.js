
function setEdgeIntoEdges (edges, edge){
     edges[`${edge.elementId}`]={source : `${edge.startNodeElementId}`, target:`${edge.endNodeElementId }`}
     return edges
}

export default setEdgeIntoEdges
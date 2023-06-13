
function setEdgeIntoEdges(edges, edge) {
     const source = edge.startNodeElementId
     const target = edge.endNodeElementId
     const label = edge.properties.label
     edges[`${edge.elementId}`] = { source: `${source}`, target: `${target}`, label: `${label}` }
     return edges
}

export default setEdgeIntoEdges
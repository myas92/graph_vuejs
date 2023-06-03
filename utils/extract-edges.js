extractEdges = (neoEdges) => {
    let edges= {}
    neoEdges.map((edge,index)=>{
        edges[`${edge._fields[0].elementId}`]={source : `${edge._fields[0].startNodeElementId}`, target:`${edge._fields[0].endNodeElementId }`}
    })

    return edges;
    
}

module.exports = {
    extractEdges
}
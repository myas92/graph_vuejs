extractNodes = (neoNodes) => {
    let nodes = {}
    neoNodes.map((node, index) => {
        nodes[`${node._fields[0].elementId}`] = {
            name: `${node._fields[0].properties.name}`,
            personalId: `${node._fields[0].properties.personalId}`
             }
    })

    return nodes;

}

module.exports = {
    extractNodes
}
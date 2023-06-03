extractNodes = (neoNodes) => {
    console.log("First Node-----------------", neoNodes)
    let nodes = {}
    neoNodes.map((node, index) => {
        nodes[`${node._fields[0].elementId}`] = {
            name: `${node._fields[0].properties.name}`,
            personalId: `${node._fields[0].properties.personalId}`
             }
    })

    console.log("End Node----------------->", nodes)
    return nodes;

}

module.exports = {
    extractNodes
}
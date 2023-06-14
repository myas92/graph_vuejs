
const isUserSelectedNodes = (nodes, selectedNodes) => {
    let [source, target] = selectedNodes;
    if (nodes[source].nodeType === 'Person' && nodes[target].nodeType === 'Person')
        return true;
    return false
}
const getTypeOfSourceTarget = (nodes, selectedNodes) => {
    let [source, target] = selectedNodes;
    return { sourceType: nodes[source].nodeType, targetType: nodes[target].nodeType }
}
const getRelationTypeModal = ({ sourceType, targetType }) => {
    if ((sourceType == 'Person' && targetType == 'Project') || sourceType == 'Project' && targetType == 'Person') {
        return 'PersonToProject'
    }
}
const isExistEdge = (edges, selectedNodes) => {
    let [source, target] = selectedNodes;
    for (const key in edges) {
        let temp = [edges[key].source, edges[key].target];
        if (temp.includes(source) && temp.includes(target)) {
            return true
        }
        console.log(temp)
    }


    return false
}

module.exports = {
    isUserSelectedNodes,
    getTypeOfSourceTarget,
    getRelationTypeModal,
    isExistEdge
}
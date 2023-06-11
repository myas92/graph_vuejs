const nodes = {
    node1: { name: "N1" },
    node2: { name: "N2" },
    node3: { name: "N3" },
}

const edges = {
    edge1: { source: "node1", target: "node2" },
    edge2: { source: "node2", target: "node3" },
}

const layouts = {
    nodes: {
        node1: { x: 50, y: 0 },
        node2: { x: 0, y: 75 },
        node3: { x: 100, y: 75 },
    },
}

export default {
    nodes,
    edges,
    layouts,
}
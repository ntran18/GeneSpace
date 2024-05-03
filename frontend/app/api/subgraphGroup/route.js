import { NextResponse } from "next/server";

async function POST(request) {
    if (request.method !== "POST") {
        return NextResponse.error("Method Not Allowed", { statusCode: 405 });
    }

    try {
        const data = await request.json(); // Parse the JSON body of the request
        const { graph, group } = data; // Destructure the 'graph' and 'group' properties from the request body
        const nodes = graph.nodes.filter((node) => node.group === group); // Filter the nodes based on the 'group' value
        // Create a map to store the original node indices and their corresponding new indices
        const nodeIndexMap = new Map(
            nodes.map((node, index) => [node.id, index])
        );

        // Reindex the node IDs if needed
        const reindexedNodes = nodes.map((node, index) => ({
            ...node,
            // Assuming node IDs start from 0
            id: index,
        }));

        // Filter the edges based on the filtered nodes and update their references
        const filteredEdges = graph.edges
            .filter(
                (edge) =>
                    nodeIndexMap.has(edge.from) && nodeIndexMap.has(edge.to)
            )
            .map((edge) => ({
                from: nodeIndexMap.get(edge.from),
                to: nodeIndexMap.get(edge.to),
            }));

        const subgraph = { nodes: reindexedNodes, edges: filteredEdges }; // Create a new subgraph object with the filtered nodes and edges

        return NextResponse.json(subgraph);
    } catch (error) {
        return NextResponse.error("Error parsing request body", {
            statusCode: 400,
        });
    }
}

module.exports = { POST };

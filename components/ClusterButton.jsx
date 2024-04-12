import React from 'react'
import { getCluster } from '@/utils/api'

const ClusterButton = ({ graph, onDataChange}) => {
    const handleClick = async () => {
        if (graph.nodes.length === 0 || graph.edges.length === 0) {
            // TODO: handle error
            return;
        } 
        try {
            const response = await getCluster(graph);
            const nodes = response.nodes;
            const edges = response.edges;
            graph = {nodes, edges};
            onDataChange(graph);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={handleClick}>Create Cluster</button>
    )
}

export default ClusterButton
import React, { useState } from "react";
import { getCluster, getSubgraphOfGroup } from "@/utils/api";
import Modal from "react-modal";

const ClusterButton = ({ graph, onDataChange, groups }) => {
    const [showModal, setShowModal] = useState(false);
    // const [groups, setGroups] = useState([]);

    const handleCreateCluster = async () => {
        if (graph.nodes.length === 0) {
            alert("There is no graph data to cluster");
            return;
        }
        try {
            const response = await getCluster(graph);
            const nodes = response.nodes;
            const edges = response.edges;
            // setGroups(response.groups_size);
            graph = { nodes, edges };
            onDataChange(graph, response.groups_size);
        } catch (error) {
            alert(
                "Cannot create cluster, something went wrong from the server side"
            );
        }
    };

    const handleChooseGroup = async (group) => {
        setShowModal(false);
        try {
            const response = await getSubgraphOfGroup(graph, group); // Wait for the promise to resolve
            graph = response;
            handleCreateCluster();
        } catch (error) {
            alert("Can't get subgraph of group, something went wrong");
        }
    };

    const handleCreateClusterAgain = () => {
        if (groups.length < 2) {
            alert("Less than 2 groups available for clustering");
            return;
        } else if (graph.nodes.length === 0) {
            alert("There is no graph data to cluster");
        } else {
            setShowModal(true);
        }
    };
    return (
        <div>
            <div className="cluster-container">
                <button className="button" onClick={handleCreateCluster}>
                    Create Cluster
                </button>
                <button className="button" onClick={handleCreateClusterAgain}>
                    Create Cluster Again
                </button>
            </div>
            <Modal isOpen={showModal} className="modal">
                <div className="modal-container">
                    <h2 className="modal-title">Choose a Group</h2>
                    {groups.map((group, index) => (
                        <button
                            key={index}
                            className="button"
                            onClick={() => handleChooseGroup(group)}
                        >
                            Group {group}
                        </button>
                    ))}
                    <button
                        className="button"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ClusterButton;

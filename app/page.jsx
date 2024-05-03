"use client";

import React, { useState, useEffect } from "react";
import UploadForm from "@/components/Input";
import GraphView from "@/components/Graph";
import SelectGenesModal from "@/components/SelectedGene";

import ClusterButton from "@/components/ClusterButton";
import SubgraphButton from "@/components/SubgraphButton";

const Home = () => {
    const [graphData, setGraphData] = useState({
        id: null,
        nodes: [],
        edges: [],
    });
    const [groups, setGroups] = useState([]);
    const [history, setHistory] = useState([]);

    // Use useEffect to update the history when graphData or groups change
    useEffect(() => {
        if (graphData.id !== null) {
            // Add the current graph data and groups to the history
            setHistory((prevHistory) => [
                ...prevHistory,
                { id: graphData.id, graph: graphData, groups: groups },
            ]);
        }
    }, [graphData, groups]);

    const handleGraphChange = (newData, newGroups) => {
        // Generate a unique identifier for the new graph data and groups
        const id = Date.now();
        // Update the current graph data with the new data and identifier
        setGraphData({ id: id, ...newData });
        // Update the current groups with the new groups and identifier
        setGroups(newGroups);
    };

    // Function to load previous graph data and groups
    const loadPreviousGraph = () => {
        if (history.length > 1) {
            // Remove the latest entry from history
            const newHistory = history.slice(0, -1);
            // Get the previous graph data and groups
            const { graph, groups } = newHistory[newHistory.length - 1];
            // Set the current graph data to the previous graph
            setGraphData(graph);
            // Set the current groups to the previous groups
            setGroups(groups);
            // Update the history
            setHistory(newHistory);
        }
    };

    return (
        <section className="main-container">
            <h1>GeneSpace</h1>
            <div className="description">
                <p>
                    GeneSpace is a tool that allows you to visualize gene
                    regulatory networks.
                </p>
            </div>
            <div className="options-container">
                <UploadForm onDataChange={handleGraphChange} />
                <SelectGenesModal onDataChange={handleGraphChange} />
                <SubgraphButton onDataChange={handleGraphChange} />
                <button onClick={loadPreviousGraph} className="button">
                    Load Previous Graph
                </button>
            </div>
            <ClusterButton
                graph={graphData}
                onDataChange={handleGraphChange}
                groups={groups}
            />
            <GraphView graph={graphData} />
        </section>
    );
};
export default Home;

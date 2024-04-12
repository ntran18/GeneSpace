"use client";

import React, { useState } from "react";
import UploadForm from "@/components/Input";
import GraphView from "@/components/Graph";
import SelectGenesModal from "@/components/SelectedGene";

import ClusterButton from "@/components/ClusterButton";
import SpecialButton from "@/components/SpecialButton";

const Home = () => {
    const [graphData, setGraphData] = useState({ nodes: [], edges: [] });

    const handleDataChange = (newData) => {
        setGraphData(newData);
    };

    return (
        <section>
            <h1>Testing Website</h1>

            <UploadForm onDataChange={handleDataChange} />
            <SelectGenesModal onDataChange={handleDataChange} />
            <SpecialButton onDataChange={handleDataChange} />
            <ClusterButton graph={graphData} onDataChange={handleDataChange} />
            <GraphView graph={graphData} />
        </section>
    );
};
export default Home;

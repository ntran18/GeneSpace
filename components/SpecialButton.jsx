import { getSubgraphOfGene } from "@/utils/api";
import React, { useState } from "react";

const SpecialButton = ({ onDataChange }) => {
    const [requestedGene, setRequestedGene] = useState("");

    const handleInputChange = (event) => {
        setRequestedGene(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission on hitting Enter
            onSubmit();
        }
    };

    const handleSubGraph = async (geneName) => {
        try {
            const response = await getSubgraphOfGene(geneName);

            if (response.exists) {
                console.log("Subgraph:", response.graph);
                onDataChange(response.graph);
            } else {
                alert("Invalid gene");
            }
        } catch (error) {
            console.error("Error generate subgraph:", error);
            throw error;
        }
    };

    const onSubmit = () => {
        console.log("Will perform the clustering on this gene", requestedGene);
        setRequestedGene("");
        handleSubGraph(requestedGene);
    };

    const handleCancel = () => {
        setRequestedGene(""); // Reset input value
    };

    return (
        <div>
            <h2>Type Genes</h2>
            <input
                type="text"
                value={requestedGene}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
            />
            <button onClick={onSubmit}>Create Clustering</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default SpecialButton;

import { getSubgraphOfGene } from "@/utils/api";
import React, { useState } from "react";
import Modal from "react-modal";

const SubgraphButton = ({ onDataChange }) => {
    const [requestedGene, setRequestedGene] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (event) => {
        setRequestedGene(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            setIsModalOpen(false);
            event.preventDefault(); // Prevent form submission on hitting Enter
            onSubmit();
        }
    };

    const handleSubGraph = async (geneName) => {
        try {
            const response = await getSubgraphOfGene(geneName);

            if (response.exists) {
                onDataChange(response.graph, []);
            } else {
                alert("Invalid gene");
            }
        } catch (error) {
            alert("Error generate subgraph:", error);
            throw error;
        }
    };

    const onSubmit = () => {
        if (requestedGene === "") {
            alert("Please enter a gene");
            return;
        }
        setRequestedGene("");
        setIsModalOpen(false);
        handleSubGraph(requestedGene);
    };

    const handleCancel = () => {
        setRequestedGene(""); // Reset input value
        setIsModalOpen(false);
    };

    return (
        <div className="select_one_gene_container">
            <button className="button" onClick={() => setIsModalOpen(true)}>
                Get Subgraph By Selecting A Gene
            </button>

            <Modal isOpen={isModalOpen} className="modal">
                <div className="modal-container">
                    <h2>Type Genes</h2>
                    <div className="input-container">
                        <input
                            type="text"
                            value={requestedGene}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            className="input-field"
                        />
                    </div>

                    <div className="button-container">
                        <button
                            onClick={handleCancel}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                        <button onClick={onSubmit} className="finish-button">
                            Get Subgraph
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SubgraphButton;

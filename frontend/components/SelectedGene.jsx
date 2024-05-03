"use client";

import { useState, useEffect } from "react";
import DynamicInputModal from "../components/Modal";
import { convertNodesAndEdgesToObject } from "@/utils/data";
import { checkGeneExistence, fetchData } from "@/utils/api";
import propTypes from "prop-types";

function SelectGenesModal({ onDataChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGenes, setSelectedGenes] = useState([]);
    const [selectedGene, setSelectedGene] = useState("");

    // Finish status - generate network or cancel
    const [isCancelled, setIsCancelled] = useState(false);

    const [data, setData] = useState([]);
    const [databaseTargetGenes, setDatabaseTargetGenes] = useState([]);
    const [dbTranscriptionFactors, setDbTranscriptionFactors] = useState([]);

    const handleCheckGeneExistence = async (geneName) => {
        try {
            const exists = await checkGeneExistence(geneName);
            if (exists) {
                setSelectedGenes((prevSelected) => [...prevSelected, geneName]);
                setSelectedGene("");
            } else {
                alert("Invalid gene");
            }
        } catch (error) {
            alert("Error checking gene existence:", error);
        }
    };

    useEffect(() => {
        const fetchDataOnce = async () => {
            try {
                const data = await fetchData();

                // Extract gene_names and tf_names
                const gene_names = Array.from(
                    new Set(
                        data.map((entry) =>
                            entry.gene_name.trim().toLowerCase()
                        )
                    )
                );
                const tf_names = Array.from(
                    new Set(
                        data.map((entry) => entry.tf_name.trim().toLowerCase())
                    )
                );

                setData(data);
                setDatabaseTargetGenes(gene_names);
                setDbTranscriptionFactors(tf_names);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataOnce();
    }, []);

    // Handle when user inputs a new gene/tf raise an alert if the gene is not in the database else add it to the selected genes
    useEffect(() => {
        if (selectedGene.length > 0) {
            handleCheckGeneExistence(selectedGene.trim());
        }
    }, [selectedGene]);

    useEffect(() => {
        if (!isCancelled && !isModalOpen && selectedGenes.length > 0) {
            handleDataChange(data);
        }
    }, [isCancelled, isModalOpen, selectedGenes]);

    useEffect(() => {
        if (!isModalOpen) {
            setSelectedGene("");
            setSelectedGenes([]);
        }
    }, [isModalOpen]);

    const handleDataChange = (data) => {
        let filteredData = data.filter(
            (entry) =>
                selectedGenes.includes(entry.gene_name.toLowerCase()) &&
                selectedGenes.includes(entry.tf_name.toLowerCase())
        );
        const nodes = selectedGenes.map((gene) => gene.toUpperCase());
        const edges = filteredData.map((entry) => [
            entry.tf_name.toUpperCase(),
            entry.gene_name.toUpperCase(),
        ]);
        const graph = convertNodesAndEdgesToObject(nodes, edges);

        onDataChange(graph, []);
    };

    return (
        <div className="load_genes_container">
            <button
                className="button"
                onClick={() => setIsModalOpen(true)}
            >
                Load Genes From Database
            </button>

            {/* DynamicInputModal component */}
            <DynamicInputModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleNewInput={setSelectedGene}
                setIsCancelled={setIsCancelled}
                selectedGenes={selectedGenes}
            />
        </div>
    );
}

SelectGenesModal.propTypes = {
    onDataChange: propTypes.func.isRequired,
};

export default SelectGenesModal;

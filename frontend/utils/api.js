import axios from "axios";

export const getCluster = async (graph) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/cluster/",
            graph
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchData = async () => {
    try {
        const response = await axios.get("/api/networkdb/");
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const checkGeneExistence = async (geneName) => {
    try {
        const response = await axios.get(`/api/networkdb/${geneName}`);
        return response.data.exists;
    } catch {
        throw error;
    }
};

export const getSubgraphOfGene = async (geneName) => {
    try {
        const response = await axios.get(`/api/subgraphGene/${geneName}`);
        return response.data;
    } catch {
        throw error;
    }
};

export const getSubgraphOfGroup = async (graph, group) => {
    const body = { graph, group };
    try {
        const response = await fetch("/api/subgraphGroup/", {
            method: "POST",
            body: JSON.stringify(body),
        });
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

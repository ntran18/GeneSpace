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
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const checkGeneExistence = async (geneName) => {
    try {
        const response = await axios.get(`/api/networkdb/${geneName}`);
        console.log(response);
        return response.data.exists;
    } catch {
        console.error("Error checking gene existence:", error);
        throw error;
    }
};

export const getSubgraphOfGene = async (geneName) => {
    try {
        const response = await axios.get(`/api/subgraph/${geneName}`);
        console.log(response);
        return response.data;
    } catch {
        console.error("Error checking gene existence:", error);
        throw error;
    }
};
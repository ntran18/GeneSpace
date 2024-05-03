import { Pool } from "pg";

export const fetchPostgresData = async () => {
    let cacheData = null;
    let genes = [];
    let tf = [];
    try {
        // Set up PostgreSQL connection pool
        const pool = new Pool({
            user: "maikatran",
            host: "localhost",
            database: "postgres",
            password: "",
            port: 5432,
        });

        const client = await pool.connect();
        try {
            // Query to get graph data, modify as needed
            const query =
                "SELECT * FROM gene_regulatory_network_research.gene_tf_relationships";

            const result = await client.query(query);
            cacheData = result.rows;

            genes = Array.from(
                new Set(cacheData.map((entry) => entry.gene_name.trim()))
            );
            tf = Array.from(
                new Set(cacheData.map((entry) => entry.tf_name.trim()))
            );
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return "Internal Server Error";
    }

    return [cacheData, genes, tf];
};

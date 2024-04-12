import { Pool } from "pg";
import { NextResponse } from "next/server";
import { fetchPostgresData } from "../../postgres/utils";

let cacheData = null;
let genes = [];
let tf = [];

const handler = async (req, res) => {
    // Check if the data is already cached
    if (!cacheData) {
        try {
            const data = await fetchPostgresData();

            cacheData = data[0];
            genes = data[1];
            tf = data[2];

            cacheData = data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // try {
        //     // Set up PostgreSQL connection pool
        //     const pool = new Pool({
        //         user: "maikatran",
        //         host: "localhost",
        //         database: "postgres",
        //         password: "",
        //         port: 5432,
        //     });

        //     const client = await pool.connect();
        //     try {
        //         // Query to get graph data, modify as needed
        //         const query =
        //             "SELECT * FROM gene_regulatory_network_research.gene_tf_relationships";

        //         const result = await client.query(query);
        //         cacheData = result.rows;

        //         genes = Array.from(
        //             new Set(cacheData.map((entry) => entry.gene_name.trim()))
        //         );
        //         tf = Array.from(
        //             new Set(cacheData.map((entry) => entry.tf_name.trim()))
        //         );
        //     } finally {
        //         // Release the client back to the pool
        //         client.release();
        //     }
        // } catch (error) {
        //     console.error("Error executing query:", error);
        //     return res.status(500).json({ error: "Internal Server Error" });
        // }
    }
    return NextResponse.json(cacheData);
};

export { handler as GET, handler as POST, genes, tf, cacheData };

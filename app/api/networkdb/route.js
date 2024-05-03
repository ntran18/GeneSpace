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
    }
    return NextResponse.json(cacheData);
};

export { handler as GET, handler as POST, genes, tf, cacheData };

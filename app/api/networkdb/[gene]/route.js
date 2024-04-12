import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET(request, context) {
    const { params } = context;
    try {
        const pool = new Pool({
            user: "maikatran",
            host: "localhost",
            database: "postgres",
            password: "",
            port: 5432,
        });

        const client = await pool.connect();
        try {
            const query =
                "SELECT * FROM gene_regulatory_network_research.genes WHERE gene_name = $1";

            const result = await client.query(query, [
                params.gene.toUpperCase(),
            ]);
            if (result.rows.length === 0) {
                return NextResponse.json({ exists: false });
            } else {
                return NextResponse.json({ exists: true });
            }
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return NextResponse.error("Internal Server Error", { statusCode: 500 });
    }
}

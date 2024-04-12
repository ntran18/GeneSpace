import { NextResponse } from "next/server";
// import { genes, tf, cacheData } from "../../networkdb/route";
import { convertNodesAndEdgesToObject } from "@/utils/data";
import { Pool } from "pg";
// import { fetchPostgresData } from "@/app/postgres/utils";
// import { data } from "vis-network";
const pool = new Pool({
    user: "maikatran",
    host: "localhost",
    database: "postgres",
    password: "",
    port: 5432,
});

export async function GET(request, context) {
    const { params } = context;
    let result = null;
    try {
        const client = await pool.connect();
        try {
            const query =
                "SELECT * FROM gene_regulatory_network_research.gene_tf_relationships WHERE gene_name = $1 OR tf_name = $1";

            result = await client.query(query, [params.gene.toUpperCase()]);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return NextResponse.error("Internal Server Error", { statusCode: 500 });
    }

    if (result.rows.length === 0) {
        return NextResponse.json({ exists: false });
    } else {
        const data = result.rows;
        const nodes = Array.from(
            new Set([
                ...data.map((entry) => entry.gene_name.trim().toUpperCase()),
                ...data.map((entry) => entry.tf_name.trim().toUpperCase()),
            ])
        );
        console.log(nodes);
        try {
            const client = await pool.connect();
            try {
                const placeholders = nodes
                    .map((_, index) => `$${index + 1}`)
                    .join(",");
                const query = `
                    SELECT * FROM gene_regulatory_network_research.gene_tf_relationships 
                    WHERE gene_name IN (${placeholders}) OR tf_name IN (${placeholders})
                `;

                result = await client.query(query, nodes);
            } finally {
                client.release();
            }
        } catch (error) {
            console.error("Error executing query:", error);
            return NextResponse.error("Internal Server Error", {
                statusCode: 500,
            });
        }

        if (result.rows.length === 0) {
            return NextResponse.json({ exists: false });
        } else {
            const data = result.rows;
            const nodes = Array.from(
                new Set([
                    ...data.map((entry) =>
                        entry.gene_name.trim().toUpperCase()
                    ),
                    ...data.map((entry) => entry.tf_name.trim().toUpperCase()),
                ])
            );

            const edges = data.map((entry) => [
                entry.tf_name.toUpperCase(),
                entry.gene_name.toUpperCase(),
            ]);

            // Convert the nodes and edges to an object
            const graph = convertNodesAndEdgesToObject(nodes, edges);
            return NextResponse.json({ exists: true, graph: graph });
        }

        // const edges = data.map((entry) => [
        //     entry.tf_name.toUpperCase(),
        //     entry.gene_name.toUpperCase(),
        // ]);

        // // Convert the nodes and edges to an object
        // const graph = convertNodesAndEdgesToObject(nodes, edges);
        // return NextResponse.json({ exists: true, graph: graph });
    }
}

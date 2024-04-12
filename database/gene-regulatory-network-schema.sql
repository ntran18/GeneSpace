-- Create schema
CREATE SCHEMA IF NOT EXISTS gene_regulatory_network_research;

-- Create tables within the schema
CREATE TABLE gene_regulatory_network_research.genes (
    gene_name TEXT PRIMARY KEY,
    gene_id SERIAL
);

CREATE TABLE gene_regulatory_network_research.transcription_factors (
    tf_name TEXT PRIMARY KEY,
    tf_id SERIAL
);

CREATE TABLE gene_regulatory_network_research.gene_tf_relationships (
    gene_name TEXT,
    tf_name TEXT,
    value INTEGER NOT NULL,
    PRIMARY KEY (gene_name, tf_name),
    FOREIGN KEY (gene_name) REFERENCES gene_regulatory_network_research.genes(gene_name),
    FOREIGN KEY (tf_name) REFERENCES gene_regulatory_network_research.transcription_factors(tf_name)
);

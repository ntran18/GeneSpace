-- Create schema
CREATE SCHEMA IF NOT EXISTS testing;

-- Create tables within the schema
CREATE TABLE testing.genes (
    gene_name TEXT PRIMARY KEY,
    gene_id SERIAL
);

CREATE TABLE testing.transcription_factors (
    tf_name TEXT PRIMARY KEY,
    tf_id SERIAL
);

CREATE TABLE testing.gene_tf_relationships (
    gene_name TEXT,
    tf_name TEXT,
    value INTEGER NOT NULL,
    PRIMARY KEY (gene_name, tf_name),
    FOREIGN KEY (gene_name) REFERENCES testing.genes(gene_name),
    FOREIGN KEY (tf_name) REFERENCES testing.transcription_factors(tf_name)
);

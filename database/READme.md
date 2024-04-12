# Important commands about database

1. Open database

   **`psql postgresql://localhost/postgres`**
2. Create schema

   `CREATE SCHEMA schema_name;`
3. Load schema to Postgres

   `psql -h hostname -d databasename(postgres) -U username -f sql_file`

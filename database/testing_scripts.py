import pandas as pd
from sqlalchemy import create_engine

csv_file = "test2.xlsx"
df = pd.read_excel(csv_file)

# Clean data
df = df.groupby('gene_short_name').max().reset_index()

# Database connection details
db_user = 'postgres'
db_password = 'Testing123'
db_host = 'localhost'
db_port = '5432'
db_name = 'gene-regulatory-network'

# Create SQLAlchemy engine with specific schema using options parameter
engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')

# Create transcription_factors table
transcription_factors_df = pd.DataFrame({'tf_name': df['gene_short_name'].str.strip()})
print(transcription_factors_df)
transcription_factors_df.to_sql('transcription_factors', engine, schema='testing', index=False, if_exists='append')

# Create genes table
genes_df = pd.DataFrame({'gene_name': df.columns[1:].str.strip()})
print(genes_df)
genes_df.to_sql('genes', engine, schema='testing', index=False, if_exists='append')

# Prepare gene_tf_relationships data
gene_tf_relationships_data = []
for index, row in df.iterrows():
    tf_name = row.iloc[0].strip()
    for gene_name, value in row[1:].items():
        gene_name = gene_name.strip()
        gene_tf_relationships_data.append({'gene_name': gene_name, 'tf_name': tf_name, 'value': value})

# Create gene_tf_relationships table
gene_tf_relationships_df = pd.DataFrame(gene_tf_relationships_data)
gene_tf_relationships_df.to_sql('gene_tf_relationships', engine, schema='testing', index=False, if_exists='append')

print('Data has been successfully imported into PostgreSQL.')
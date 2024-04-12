import pandas as pd
from sqlalchemy import create_engine

csv_file = "yeast_promoter_GRN.csv"
df = pd.read_csv(csv_file)

# Clean data
df = df.drop(['peak_id', 'Unnamed: 0'], axis=1)
df = df.groupby('gene_short_name').max().reset_index()

# Database connection details
db_user = 'maikatran'
db_password = ''
db_host = 'localhost'
db_port = '5432'
db_name = 'postgres'
schema = "gene_regulatory_network_research"

# Create SQLAlchemy engine with specific schema using options parameter
engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')

# Create transcription_factors table
genes_df = pd.DataFrame({'gene_name': df['gene_short_name'].str.strip()})
print(genes_df)
genes_df.to_sql('genes', engine, schema=schema, index=False, if_exists='replace')

# Create genes table
transcription_factors_df = pd.DataFrame({'tf_name': df.columns[1:].str.strip()})
print(transcription_factors_df)
transcription_factors_df.to_sql('transcription_factors', engine, schema=schema, index=False, if_exists='replace')

# Prepare gene_tf_relationships data
gene_tf_relationships_data = []
# Iterate through each target gene
for index, row in df.iterrows():
    target_gene = row.iloc[0].strip()
    for tf, value in row[1:].items():
        if value == 1:
            tf = tf.strip()
            gene_tf_relationships_data.append({'gene_name': target_gene, 'tf_name': tf, 'value': value})

# Create gene_tf_relationships table
gene_tf_relationships_df = pd.DataFrame(gene_tf_relationships_data)
gene_tf_relationships_df.to_sql('gene_tf_relationships', engine, schema=schema, index=False, if_exists='replace')

print('Data has been successfully imported into PostgreSQL.')
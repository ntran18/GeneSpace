import pandas as pd

data = [
    ["gene_short_name", "A", "B", "C"],
    ["A", 1, 0, 1],
    ["B", 0, 0, 1],
    ["A", 1, 1, 0],
    ["C", 0, 0, 0]
]

# Skip the first row when creating the DataFrame
df = pd.DataFrame(data[1:], columns=data[0])

# Group by 'gene_short_name' and take the maximum value for each group
df = df.groupby('gene_short_name').max().reset_index()

print(df)
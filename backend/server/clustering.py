from sknetwork.clustering import Louvain
import numpy as np

def clustering(graph):
    
    edges = convert_edge_structure(graph.edges)
    
    #craete the Louvain object
    Louvain = Louvain()
    labels = Louvain.fit_transform(edges)
    labels_unique, counts = np.unique(labels, return_counts=True)
    print("size labels", len(labels))
    print("size nodes", len(graph.nodes))
    
    # Add group to each node
    for i, node in enumerate(graph.nodes):
        node['group'] = labels[i]
    return graph, labels_unique, counts


def convert_edge_structure(edges):
    # Convert the edge structure from {from: 1, to: 2} to (1, 2)
    modified_edges = [(edge['from'], edge['to']) for edge in edges]
    return modified_edges.toarray()

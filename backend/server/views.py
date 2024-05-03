from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import FileUploadSerializer

import pandas as pd
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from server.models import File
from server.forms import FileForm

from sknetwork.clustering import Louvain
from sknetwork.data import from_adjacency_list
import numpy as np

def clustering(graph):
    print("Edges before converting", graph["edges"])
    # get list of id of nodes in edges
    edges_node_id = []
    for edge in graph["edges"]:
        node_id_from = edge["from"]
        node_id_to = edge["to"]
        if node_id_from not in edges_node_id:
            edges_node_id.append(node_id_from)
        if node_id_to not in edges_node_id:
            edges_node_id.append(node_id_to)
    print("Edges node id", edges_node_id)
    group_label = 0
    # Convert it to set
    edges_node_id.sort()
    if (len(graph["edges"]) > 1):
        edges = convert_edge_structure(graph["edges"])
        print(type(edges))
        print("Edges", edges)
        #create the Louvain object
        louvain = Louvain()
        # [2,1,2,3,...]
        labels = louvain.fit_predict(edges)
        labels_unique, counts = np.unique(labels, return_counts=True)
        print("label unique", labels_unique)
        group_label = len(labels_unique)
        # Debugging
        print("size labels", len(labels))
        print("size nodes", len(graph["nodes"]))
        for i, node_id in enumerate(edges_node_id):
            graph["nodes"][node_id]['group'] = labels[i]
    else:
        for node_id in edges_node_id:
            print('graph["nodes"][node_id]["group"]', graph["nodes"][node_id]['group'])
            graph["nodes"][node_id]['group'] = group_label
    if (len(graph["nodes"]) > len(edges_node_id)):
        group_label += 1
        for node in graph["nodes"]:
            if node["id"] not in edges_node_id:
                node['group'] = group_label
    print("graph[nodes]", graph["nodes"])
    
    if (len(graph["edges"]) > 1):
        return graph, labels_unique, counts + group_label
    elif (len(graph["edges"]) == 0):
        return graph, [group_label], group_label
    else:
        return graph, list(range(group_label + 1)), group_label + 1
            
    # return graph, labels_unique, counts


def convert_edge_structure(edges):
    # Convert the edge structure from {from: 1, to: 2} to (1, 2)
    modified_edges = [(edge['from'], edge['to']) for edge in edges]
    print("Modified edges", modified_edges)
    adjacency_matrix = from_adjacency_list(modified_edges)
    return adjacency_matrix

@api_view(['GET'])
def get_data(request):
    person = {'name': 'Denis', 'age': 28}
    return Response(person)

@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])  # Allow access to anyone (CORS)
def graphCommunity(request):
    if request.method == 'POST':
        graph = request.data
        graph, labels_unique, counts = clustering(graph)
        result = {"groups_size": labels_unique, "groups_count": counts}
        result.update(graph)
        return Response(result, status=200)
    elif request.method == 'OPTIONS':
        # Respond to OPTIONS request with CORS headers
        response = Response({'message': 'Preflight request accepted'}, status=200)
        response['Access-Control-Allow-Origin'] = "http://localhost:3000"
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'  # Adjust as needed
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'  # Adjust as needed
        return response



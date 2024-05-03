"use client";

import React, { useEffect, useRef } from "react";
import propTypes from "prop-types";
import { Network } from "vis-network";

const Graph = ({ graph }) => {
    const container = useRef(null);

    useEffect(() => {
        const nodes = graph.nodes;

        const edges = graph.edges;
        
        var options = {
            nodes: {
                shape: "dot",
                scaling: {
                    min: 10,
                    max: 30,
                    label: {
                        min: 8,
                        max: 30,
                        drawThreshold: 12,
                        maxVisible: 20,
                    },
                },
                font: {
                    size: 12,
                    face: "Tahoma",
                },
                borderWidth: 2, // Border width for the nodes
            },
            edges: {
                width: 0.15,
                color: { inherit: "from" },
                smooth: {
                    type: "continuous",
                },
            },
            physics: {
                enabled: false, // Disable physics to prevent the graph from moving
            },
            interaction: {
                navigationButtons: true,
                tooltipDelay: 200,
                hideEdgesOnDrag: true,
                hideEdgesOnZoom: true,
                hover: true, // Enable hovering
                hoverConnectedEdges: true, // Show labels for connected edges when hovering
                zoomView: false,
            },
            height: "100%",
            width: "100%", // Set the width to fill the container
        };
        const network =
            container.current &&
            new Network(container.current, { nodes, edges }, options);

        return () => {
            network && network.destroy();
        };
    }, [container, graph.nodes, graph.edges]);

    return <div className="container" ref={container} />;
};

Graph.propTypes = {
    graph: propTypes.object.isRequired,
};

export default Graph;

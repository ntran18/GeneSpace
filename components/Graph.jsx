"use client"

import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { Network } from 'vis-network';

const Graph = ({ graph }) => {
  const container = useRef(null);

  useEffect(() => {
    const nodes = graph.nodes;

    const edges = graph.edges;

    // let options = {};
    
    // if (nodes.length < 150) {
    //   options = {
    //     interaction: {
    //       navigationButtons: true,
    //       zoomView: true, // Enable zooming with the mouse wheel
    //       zoomSpeed: 0.1, // Adjust the zoom speed if needed
    //     },
    //     nodes: {
    //         widthConstraint: 80, 
    //         heightConstraint: 20, 
    //         shape: 'box', 
    //         color: {
    //             background: 'white', 
    //             border: 'black' 
    //         },
    //         font: {
    //             size: 20 
    //         },
    //         shapeProperties: {
    //             borderRadius: 0 
    //         }
    //     },
    //     edges: {
    //       color: 'black', 
    //       arrows: {
    //         to: {
    //           enabled: false,
    //           scaleFactor: 0.5
    //         }
    //       }
    //     },
    //     physics: {
    //       enabled: true,
    //       // improvedLayout: false,   
    //     },
    //     layout: {
    //       improvedLayout: false
    //     }
    //   };
    // } else {
    //   options = {
    //     nodes: {
    //       shape: "dot", 

    //     }
    //   }
    // }
    
    var options = {
      nodes:{
          shape: "dot",
          scaling: {
              min: 10,
              max: 30,
              label: {
                  min: 8,
                  max: 30,
                  drawThreshold: 12,
                  maxVisible: 20
              }
          },
          font: {
              size: 12,
              face: "Tahoma"
          }
      },
      edges: {
          width: 0.15,
          color: {inherit: "from"},
          smooth: {
              type: "continuous"
          }
      },
      physics: false,
      interaction: {
          navigationButtons: true,
          tooltipDelay: 200,
          hideEdgesOnDrag: true,
          hideEdgesOnZoom: true
      },
      height: "900px"
  }

  

    const network =
      container.current &&
      new Network(container.current, { nodes, edges }, options);

    // Clean up function to destroy the network on component unmount
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
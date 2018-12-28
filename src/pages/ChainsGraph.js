import React, { Component } from "react";
import API from "../api";
import Graph from "react-graph-vis";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    var graph = {
      nodes: [],
      edges: []
    };

    if (this.props.data != null) {
      graph = {
        nodes: this.props.data.nodes,
        edges: this.props.data.edges
      };
    }

    var options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000",
        arrows: "to",
        smooth: {
          forceDirection: "none"
        }
      },
      nodes: {
        color: "#ffffff"
      },
      physics: {
        minVelocity: 0.6
      },
      interaction: {
        hover: true,
        tooltipDelay: 300
      }
    };

    var events = {
      select: function(event) {
        var { nodes, edges } = event;
      }
    };

    return (
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{
          height: "1200px",
          width: "100%",
          display: "block",
          margin: "auto"
        }}
      />
    );
  }
}

import React, { Component } from "react";
import API from "../api";
import Graph from "react-graph-vis";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    API.getWins(
      "Duke",
      teams => {
        console.log(teams);
      },
      error => {
        console.log(error);
      }
    );
    //
    // API.getChains(
    //   "2019",
    //   "Duke",
    //   "UNC",
    //   // the data is returned in entries
    //   chains => {
    //     console.log(chains);
    //   },
    //   // an error is returned
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  render() {
    var graph = {
      nodes: [
        {
          id: 1,
          label: "Duke",
          shape: "image",
          image: "cbb-chain-game/src/pages/26.png"
        },
        { id: 2, label: "UNC" },
        { id: 3, label: "Gonzaga" },
        { id: 4, label: "GADU University" },
        { id: 5, label: "Clark Bray" },
        { id: 6, label: "Syracuse" },
        { id: 7, label: "Yeet" }
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 1, to: 5 },
        { from: 6, to: 7 },
        { from: 7, to: 4 },
        { from: 7, to: 5 }
      ]
    };

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
      physics: {
        minVelocity: 0.75
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
        style={{ height: "600px" }}
      />
    );
  }
}

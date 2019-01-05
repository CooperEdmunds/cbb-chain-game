import React, { Component } from "react";
import Graph from "react-graph-vis";
import { Container, Row, Col } from "reactstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default class GraphDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: 0
    };
  }

  handleTabChange = (event, value) => {
    this.setState({ tabState: value });
  };

  render() {
    var graph = {
      nodes: [],
      edges: []
    };

    if (this.state.tabState == 0) {
      if (this.state.tabState === 0) {
        graph = {
          nodes: this.props.aToB.nodes,
          edges: this.props.aToB.edges
        };
      } else {
        graph = {
          nodes: this.props.bToA.nodes,
          edges: this.props.bToA.edges
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
          // eslint-disable-next-line
          var { nodes, edges } = event;
        }
      };

      return (
        <div>
          <Row>
            <Col>
              <Tabs
                value={this.state.tabState}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleTabChange}
                centered
              >
                <Tab label={this.props.teamA + " > " + this.props.teamB} />
                <Tab label={this.props.teamB + " > " + this.props.teamA} />
              </Tabs>
            </Col>
          </Row>

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
        </div>
      );
    }
  }
}

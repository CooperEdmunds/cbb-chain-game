import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListsDisplay from "./ListsDisplay";
import GraphDisplay from "./GraphDisplay";

export default class DataDisplay extends Component {
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
    const { tabState } = this.state;

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
              <Tab label="List" />
              <Tab label="Map" />
            </Tabs>
          </Col>
        </Row>
        {tabState === 0 && (
          <ListsDisplay
            teamA={this.props.teamA}
            teamB={this.props.teamB}
            aToB={this.props.aToB}
            bToA={this.props.bToA}
          />
        )}
        {tabState === 1 && (
          <GraphDisplay
            teamA={this.props.teamA}
            teamB={this.props.teamB}
            aToB={this.props.aToB}
            bToA={this.props.bToA}
          />
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import { ReactComponent as DoubleChain } from "../../Icons/double-chain.svg";

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

  stringifyChain = chain => {
    let chainString = "";
    let totalDifferetial = 0;
    for (var i = 0; i < chain.length; i++) {
      let link = chain[i];
      let diff = link.w_s - link.l_s;
      totalDifferetial += diff;
      chainString += " (" + diff + ")> " + link.l;
    }
    return [chainString, totalDifferetial];
  };

  makeRow = (teamName, chain, key, showDivider) => {
    let stringifyChainData = this.stringifyChain(chain);
    let chainString = teamName + stringifyChainData[0];
    let diff = stringifyChainData[1];
    let dividerDiv = null;

    if (showDivider) {
      dividerDiv = <Divider variant="middle" />;
    }

    return (
      <div key={key}>
        <ListItem>
          <img
            src={require("../../Icons/double-chain.svg")}
            height="16"
            width="16"
          />
          <ListItemText primary={chainString} />
          <ListItemSecondaryAction>
            <ListItemText primary={diff} />
          </ListItemSecondaryAction>
        </ListItem>
        {dividerDiv}
      </div>
    );
  };

  render() {
    const { tabState } = this.state;

    let teamA = this.props.teamA;
    let teamB = this.props.teamB;

    let aToBChains = this.props.aToB.chains;
    let bToAChains = this.props.bToA.chains;

    let aToBItems = [];
    let btoAItems = [];

    let i = 0;
    aToBItems = this.props.aToB.chains.map(chain => {
      return this.makeRow(teamA, chain, i++, i < aToBChains.length);
    });

    let j = 0;
    btoAItems = this.props.bToA.chains.map(chain => {
      return this.makeRow(teamB, chain, i + j++, j < bToAChains.length);
    });

    return (
      <div>
        <br />
        <div className="d-none d-md-block">
          <Row>
            <Col className="col-6">
              <center>
                <strong>{teamA + " > " + teamB}</strong>
              </center>
            </Col>
            <Col className="col-6">
              <center>
                <strong>{teamB + " > " + teamA}</strong>
              </center>
            </Col>
          </Row>
          <Row>
            <Col className="col-6 right-border">
              <List>{aToBItems}</List>
            </Col>
            <Col className="col-6">
              <List>{btoAItems}</List>
            </Col>
          </Row>
        </div>
        <div className="d-sm-block d-md-none">
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
          <Row>
            <Col>
              {tabState === 0 && <List>{aToBItems}</List>}
              {tabState === 1 && <List>{btoAItems}</List>}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

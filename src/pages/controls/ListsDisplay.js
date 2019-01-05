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
import SvgIcon from "@material-ui/core/SvgIcon";

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

    const DoubleChainIcon = props => (
      <SvgIcon {...props}>
        <svg
          id="prefix__Layer_1"
          x={0}
          y={0}
          viewBox="0 0 58.3 42.2"
          xmlSpace="preserve"
          {...props}
        >
          <style>{".prefix__st0{fill:#4f4f5b}"}</style>
          <path
            className="prefix__st0"
            d="M21.1 31.7L13 36.5c-2.5 1.5-5.7.7-7.1-1.7-1.4-2.4-.6-5.6 1.9-7.1l8.1-4.8c1.4-.8 3-.9 4.4-.4l4.6-2.7c-2.1-2.3-5.7-3-8.5-1.3l-13 7.7C.1 28-1 32.3.9 35.5l2 3.3c1.9 3.2 6.1 4.3 9.4 2.4l13-7.7c2.8-1.7 4-5.1 3-8.1l-4.7 2.8c-.3 1.4-1.2 2.7-2.5 3.5zM57.3 6.7l-2-3.3C53.5.1 49.3-1 46 .9L33 8.6c-2.8 1.7-4 5.1-3 8.1l5-3c.3-1.4 1.1-2.7 2.5-3.5l8.1-4.8c2.5-1.5 5.7-.7 7.1 1.7 1.4 2.4.5 5.5-1.9 7L42.7 19c-1.3.8-2.9.9-4.3.5l-5 3c2.1 2.3 5.7 3 8.5 1.3l13-7.7c3.3-2 4.4-6.2 2.4-9.4z"
          />
          <path
            className="prefix__st0"
            d="M39.8 14.8c-.6-1-1.9-1.4-2.9-.8L35 15.2l-4.5 2.6-4.9 2.9-4.1 2.4-1.1.6c-.2.1-.4.3-.6.5 0 0 0 .1-.1.1-.4.7-.5 1.5-.1 2.3.6 1 1.9 1.4 2.9.8l1-.6 4.1-2.4 1.2-.7 3.6-2.2 4.5-2.6 1.9-1.1c.3-.2.6-.4.7-.7.6-.7.7-1.6.3-2.3z"
          />
        </svg>
      </SvgIcon>
    );

    return (
      <div key={key}>
        <ListItem>
          <ListItemIcon>
            <DoubleChainIcon />
          </ListItemIcon>
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
                <img
                  src={require("../../Icons/trophy.svg")}
                  height="16"
                  width="16"
                />
                <strong>{" " + teamA + " > " + teamB}</strong>
              </center>
            </Col>
            <Col className="col-6">
              <center>
                <img
                  src={require("../../Icons/trophy.svg")}
                  height="16"
                  width="16"
                />
                <strong>{" " + teamB + " > " + teamA}</strong>
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

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

export default class GraphDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
      dividerDiv = <Divider />;
    }

    return (
      <div>
        <ListItem key={key}>
          <InboxIcon />
          <ListItemText primary={chainString} />
          <ListItemSecondaryAction>{diff + "   "}</ListItemSecondaryAction>
        </ListItem>
        {dividerDiv}
      </div>
    );
  };

  render() {
    let teamA = this.props.teamA;
    let teamB = this.props.teamB;

    let aToBChains = this.props.aToB.chains;
    let bToAChains = this.props.bToA.chains;

    let aToBRows = [];
    let bToARows = [];

    let i = 0;
    aToBRows = this.props.aToB.chains.map(chain => {
      return this.makeRow(teamA, chain, i++, i < aToBChains.length);
    });

    let j = 0;
    bToARows = this.props.bToA.chains.map(chain => {
      return this.makeRow(teamB, chain, i + j++, j < bToAChains.length);
    });

    return (
      <div>
        <Row />
        <Row>
          <Col className="col-6 right-border">
            <List>{aToBRows}</List>
          </Col>
          <Col className="col-6">
            <List>{bToARows}</List>
          </Col>
        </Row>
      </div>
    );
  }
}

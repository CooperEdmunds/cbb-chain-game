import React, { Component } from "react";
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
    return chainString + ": " + totalDifferetial;
  };

  render() {
    let teamA = this.props.teamA;
    let teamB = this.props.teamB;

    let aToBRows = [];
    let bToARows = [];

    var i = 0;
    aToBRows = this.props.aToB.chains.map(chain => {
      var chainString = teamA + this.stringifyChain(chain);
      return (
        <tr key={i++}>
          <td>*icon*</td>
          <td> {chainString} </td>
        </tr>
      );
    });

    bToARows = this.props.bToA.chains.map(chain => {
      var chainString = teamB + this.stringifyChain(chain);
      return (
        <tr key={i++}>
          <td>*icon*</td>
          <td> {chainString} </td>
        </tr>
      );
    });

    return (
      <Row>
        <Col className="col-6">
          <table>
            <tr className="chains-table-header">
              <th colspan="2">
                <center>
                  <img
                    src="../Icons/trophy.svg"
                    alt="Winning team"
                    style={{ height: "2.3rem" }}
                  />
                  {teamA + " > " + teamB}
                </center>
              </th>
            </tr>
            {aToBRows}
          </table>
        </Col>
        <Col className="col-6">
          <table>
            <tr className="chains-table-header">
              <th colspan="2">
                <center>
                  <img
                    src="../Icons/trophy.svg"
                    alt="Winning team"
                    style={{ height: "2.3rem" }}
                  />
                  {teamB + " > " + teamA}
                </center>
              </th>
            </tr>
            {bToARows}
          </table>
        </Col>
      </Row>
    );
  }
}

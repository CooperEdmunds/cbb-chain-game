import React, { Component } from "react";
import API from "../api";
import Graph from "react-graph-vis";
import { Container, Row, Col } from "reactstrap";
import SmartField from "./SmartField";
import teams from "../team-list";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ChainsGraph from "./ChainsGraph";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    let teams_list = teams;
    teams_list.sort();
    this.state = {
      teamA: "",
      teamB: "",
      exclude: [],
      aToB: {},
      bToA: {},
      teams: teams_list,
      tabState: 0,
      loadingState: 0
      // 0: no query yet; 1: loading query; 2: ready to display; 3: error
    };

    this.handleTeamAChange = this.handleTeamAChange.bind(this);
    this.handleTeamBChange = this.handleTeamBChange.bind(this);
  }

  handleTeamAChange = evt => {
    this.setState({ teamA: evt.target.value });
  };

  handleTeamBChange = evt => {
    this.setState({ teamB: evt.target.value });
  };

  handleTabChange = (event, value) => {
    this.setState({ tabState: value });
  };

  submit = () => {
    this.setState({ loadingState: 1 });
    API.getChains(
      this.state.teamA,
      this.state.teamB,
      this.state.exclude,
      data => {
        this.setState({
          aToB: data["a_to_b"],
          bToA: data["b_to_a"],
          loadingState: 2
        });
      },
      error => {
        console.log(error);
        this.setState({ loadingState: 3 });
      }
    );
  };

  teamAHandler = team => {
    if (team != null) {
      this.setState({ teamA: team.value });
    } else {
      this.setState({ teamA: null });
    }
  };

  teamBHandler = team => {
    if (team != null) {
      this.setState({ teamB: team.value });
    } else {
      this.setState({ teamB: null });
    }
  };

  excludedHandler = teams => {
    let teamNames = teams.map(function(teamObj) {
      return teamObj.value;
    });
    this.setState({ exclude: teamNames });
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
    return chainString + ": " + totalDifferetial;
  };

  render() {
    let teamA = this.state.teamA;
    let teamB = this.state.teamB;

    let excludeOptions = this.state.teams.filter(function(team) {
      return team !== teamA && team !== teamB;
    });

    const { tabState, loadingState } = this.state;

    let aToBRows = [];
    let bToARows = [];

    if (loadingState === 2) {
      var i = 0;
      aToBRows = this.state.aToB.chains.map(chain => {
        var chainString = teamA + this.stringifyChain(chain);
        return (
          <tr>
            <td>{chainString}</td>
          </tr>
        );
      });

      bToARows = this.state.bToA.chains.map(chain => {
        var chainString = teamB + this.stringifyChain(chain);
        return (
          <tr>
            <td>{chainString}</td>
          </tr>
        );
      });
    }

    return (
      <Container>
        <br />
        <Paper className="my-3 py-2" elevation={3}>
          <Row className="my-3 mx-auto justify-content-center">
            <Col className="mb-5 col-10 col-md-5">
              <SmartField
                isMulti={false}
                labelTitle={"First team"}
                placeholder={""}
                choices={this.state.teams}
                onChangeHandler={this.teamAHandler}
              />
            </Col>
            <Col className="mb-5 col-10 col-md-5">
              <SmartField
                isMulti={false}
                labelTitle={"Second team"}
                placeholder={""}
                choices={this.state.teams}
                onChangeHandler={this.teamBHandler}
              />
            </Col>
            <Col className="col-12 col-md-8">
              <SmartField
                isMulti={true}
                labelTitle={"Teams to exclude:"}
                placeholder={""}
                choices={excludeOptions}
                onChangeHandler={this.excludedHandler}
              />
            </Col>
          </Row>
          <Row className="my-4 justify-content-center">
            <Col className="text-center">
              <Button variant="contained" color="primary" onClick={this.submit}>
                Find Chains
              </Button>
            </Col>
          </Row>
        </Paper>
        <Paper className="my-5 pb-2" elevation={3}>
          {loadingState === 0 && <div>Select two teams to see their links</div>}
          {loadingState === 1 && <div>Loading...</div>}
          {loadingState === 2 && (
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
                <Row>
                  <Col className="col-6">
                    <h2>{teamA + " > " + teamB}</h2>
                    <table class="table table-hover">
                      <tbody>{aToBRows}</tbody>
                    </table>
                  </Col>
                  <Col className="col-6">
                    <h2>{teamB + " > " + teamA}</h2>
                    <table class="table table-hover">
                      <tbody>{bToARows}</tbody>
                    </table>
                  </Col>
                </Row>
              )}
              {tabState === 1 && (
                <Row>
                  <Col className="col">
                    <ChainsGraph data={this.state.aToB} />
                  </Col>
                </Row>
              )}
            </div>
          )}
          {loadingState === 3 && <div>Error</div>}
        </Paper>
      </Container>
    );
  }
}

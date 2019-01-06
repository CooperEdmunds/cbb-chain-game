import React, { Component } from "react";
import API from "../api";
import Graph from "react-graph-vis";
import { Container, Row, Col } from "reactstrap";
import SmartField from "./controls/SmartField";
import teams from "../team-list";
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
import DataDisplay from "./controls/DataDisplay";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    let teams_list = teams;
    teams_list.sort();
    this.state = {
      teamA: "",
      teamB: "",
      tempTeamA: "",
      tempTeamB: "",
      exclude: [],
      aToB: {},
      bToA: {},
      teams: teams_list,
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

  submit = () => {
    let teamA = this.state.tempTeamA;
    let teamB = this.state.tempTeamB;

    this.setState({
      loadingState: 1,
      teamA: teamA,
      teamB: teamB
    });

    API.getChains(
      teamA,
      teamB,
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
      this.setState({ tempTeamA: team.value });
    } else {
      this.setState({ tempTeamA: null });
    }
  };

  teamBHandler = team => {
    if (team != null) {
      this.setState({ tempTeamB: team.value });
    } else {
      this.setState({ tempTeamB: null });
    }
  };

  excludedHandler = teams => {
    let teamNames = teams.map(function(teamObj) {
      return teamObj.value;
    });
    this.setState({ exclude: teamNames });
  };

  render() {
    let teamA = this.state.teamA;
    let teamB = this.state.teamB;

    let excludeOptions = this.state.teams.filter(function(team) {
      return team !== teamA && team !== teamB;
    });

    const { loadingState } = this.state;

    return (
      <div>
        <br />
        <Paper className="col-10 mx-auto my-3 py-2" elevation={3}>
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
        <Row className="col-12 mx-auto my-3 py-2">
          <Col>
            <div className="my-3 pb-2">
              {loadingState === 0 && (
                <div className="center-block">
                  <img
                    src={require("../Icons/select-teams-chain.svg")}
                    className="broken-chains"
                  />
                  <br />
                  <div className="error-text">
                    <center>
                      Enter two teams to view chains between them.
                    </center>
                  </div>
                </div>
              )}
              {loadingState === 1 && (
                <div className="center-block">
                  <img
                    src={require("../Icons/loading.gif")}
                    className="loading"
                  />
                </div>
              )}
              {loadingState === 2 && (
                <DataDisplay
                  teamA={this.state.teamA}
                  teamB={this.state.teamB}
                  aToB={this.state.aToB}
                  bToA={this.state.bToA}
                />
              )}
              {loadingState === 3 && (
                <div className="center-block">
                  <img
                    src={require("../Icons/broken-chains.svg")}
                    className="broken-chains"
                  />
                  <br />
                  <div className="error-text-header">
                    <center>Uh-oh...</center>
                  </div>
                  <div className="error-text">
                    <center>
                      Looks like we’ve encountered some broken chains.
                    </center>
                    <center>Please try again.</center>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

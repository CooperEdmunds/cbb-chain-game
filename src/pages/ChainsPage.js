import React, { Component } from "react";
import API from "../api";
import Graph from "react-graph-vis";
import { Container, Row, Col, Button } from "reactstrap";
import SmartField from "./SmartField";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamA: "",
      teamB: "",
      exclude: [],
      aToB: [],
      bToA: [],
      teams: [
        "Clemson",
        "Texas",
        "Duke",
        "Wake Forest",
        "UNC",
        "Virginia",
        "Miami (FL)"
      ]
    };

    this.handleTeamAChange = this.handleTeamAChange.bind(this);
    this.handleTeamBChange = this.handleTeamBChange.bind(this);
    this.handleExcludeChange = this.handleExcludeChange.bind(this);
  }

  handleTeamAChange = evt => {
    this.setState({ teamA: evt.target.value });
  };

  handleTeamBChange = evt => {
    this.setState({ teamB: evt.target.value });
  };

  handleExcludeChange = evt => {
    this.setState({ exclude: evt.target.value.split(", ") });
  };

  submit = () => {
    API.getChains(
      this.state.teamA,
      this.state.teamB,
      this.state.exclude,
      chains => {
        this.setState({
          aToB: chains["a_to_b_chains"],
          bToA: chains["b_to_a_chains"]
        });
      },
      error => {
        console.log(error);
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

  render() {
    let i = 0;
    const aToBChainElements = this.state.aToB.map(chain => {
      return <li key={i++}>{chain}</li>;
    });

    const bToAChainElements = this.state.bToA.map(chain => {
      return <li key={i++}>{chain}</li>;
    });

    let teamA = this.state.teamA;
    let teamB = this.state.teamB;

    let excludeOptions = this.state.teams.filter(function(team) {
      return team !== teamA && team !== teamB;
    });

    return (
      <Container>
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
            <Button className="" color="secondary" onClick={this.submit}>
              Find Chains!
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col-6">
            <ul>{aToBChainElements}</ul>
          </Col>
          <Col className="col-6">
            <ul>{bToAChainElements}</ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

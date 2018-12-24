import React, { Component } from "react";
import API from "../api";
import Graph from "react-graph-vis";
import { Container, Row, Col, Button } from "reactstrap";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamA: "",
      teamB: "",
      exclude: [],
      aToB: [],
      bToA: []
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

  render() {
    let i = 0;
    const aToBChainElements = this.state.aToB.map(chain => {
      return <li key={i++}>{chain}</li>;
    });

    const bToAChainElements = this.state.bToA.map(chain => {
      return <li key={i++}>{chain}</li>;
    });

    return (
      <Container>
        <Row className="my-4 mx-auto justify-content-center">
          <Col className="col-4">
            <input
              className="form-control"
              type="text"
              name="teamA"
              id="teamA"
              placeholder="Duke"
              value={this.state.teamA}
              onChange={this.handleTeamAChange}
            />
          </Col>
          <Col className="col-4">
            <input
              className="form-control"
              type="text"
              name="teamB"
              id="teamB"
              placeholder="UNC"
              value={this.state.teamB}
              onChange={this.handleTeamBChange}
            />
          </Col>
        </Row>
        <Row className="my-4 justify-content-center">
          <Col className="col-6">
            Exclude these teams (comma+space separated, please):
            <input
              className="form-control"
              type="text"
              name="exclude"
              id="exclude"
              placeholder="Texas, Virginia"
              value={this.state.exclude.join(", ")}
              onChange={this.handleExcludeChange}
            />
          </Col>
        </Row>
        <Row className="my-4 justify-content-center">
          <Col className="col-2">
            <Button
              className="btn-block"
              color="secondary"
              onClick={this.submit}
            >
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

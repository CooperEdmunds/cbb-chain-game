import React, { Component } from "react";
import API from "./api";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // API.getTeams(
    //   teams => {
    //     console.log(teams);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    //
    // API.getChains(
    //   "2019",
    //   "Duke",
    //   "UNC",
    //   // the data is returned in entries
    //   chains => {
    //     console.log(chains);
    //   },
    //   // an error is returned
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  render() {
    return <div>CBB CHAIN GAME!</div>;
  }
}

import "./App.css";

import React, { Component } from "react";
import { Route, HashRouter, NavLink } from "react-router-dom";
import { Button, Nav, Navbar, NavItem } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navbar
            className="justify-content-center my-auto"
            style={{ backgroundColor: "#0736A4" }}
            expand="md"
            id="header"
          >
            <Nav>
              <NavItem>
                <LinkContainer to="/">
                  <Button color="link">
                    <span style={{ color: "#FFFFFF" }}>
                      <strong>Home</strong>
                    </span>
                  </Button>
                </LinkContainer>
              </NavItem>
              <div>&emsp; &emsp;</div>
              <NavItem>
                <LinkContainer to="/about">
                  <Button color="link">
                    <span style={{ color: "#FFFFFF" }}>
                      <strong>About</strong>
                    </span>
                  </Button>
                </LinkContainer>
              </NavItem>
            </Nav>
          </Navbar>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;

import "./App.css";

import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import { Button, Nav, Navbar, NavItem } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";

import ChainsPage from "./pages/ChainsPage";
import AboutPage from "./pages/AboutPage";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Navbar
            className="justify-content-center my-auto"
            style={{ backgroundColor: "#ffffff" }}
            expand="md"
            id="header"
          >
            <Nav>
              <NavItem>
                <LinkContainer to="/">
                  <Button color="link">
                    <span style={{ color: "#4F4F5B" }}>
                      <strong>Home</strong>
                    </span>
                  </Button>
                </LinkContainer>
              </NavItem>
              <div>&emsp; &emsp;</div>
              <NavItem>
                <LinkContainer to="/about">
                  <Button color="link">
                    <span style={{ color: "#4F4F5B" }}>
                      <strong>About</strong>
                    </span>
                  </Button>
                </LinkContainer>
              </NavItem>
            </Nav>
          </Navbar>
          <div>
            <Route exact path="/" component={ChainsPage} />
            <Route exact path="/about" component={AboutPage} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;

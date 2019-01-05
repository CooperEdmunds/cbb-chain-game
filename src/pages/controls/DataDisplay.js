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
import ListsDisplay from "./ListsDisplay";
import GraphDisplay from "./GraphDisplay";
import SvgIcon from "@material-ui/core/SvgIcon";

export default class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: 0
    };
  }

  handleTabChange = (event, value) => {
    this.setState({ tabState: value });
  };

  render() {
    const { tabState } = this.state;

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

    const NetIcon = props => (
      <SvgIcon {...props}>
        <svg
          id="prefix__Layer_1"
          x={0}
          y={0}
          viewBox="0 0 167.9 170.1"
          xmlSpace="preserve"
          {...props}
        >
          <style>{".prefix__st0{fill:#4f4f5b}"}</style>
          <circle className="prefix__st0" cx={157} cy={128.8} r={10.9} />
          <path
            className="prefix__st0"
            d="M67.2 163.5L8.1 87.9 63.5 8.3l93.4 26.3 2.3 95.9-92 33zM13.5 87.8l55.2 70.6 86-30.8-2.1-89.6-87.3-24.7-51.8 74.5z"
          />
          <circle className="prefix__st0" cx={154.9} cy={36.2} r={10.9} />
          <circle className="prefix__st0" cx={64.4} cy={10.9} r={10.9} />
          <circle className="prefix__st0" cx={10.9} cy={87.6} r={10.9} />
          <circle className="prefix__st0" cx={68.8} cy={159.2} r={10.9} />
          <circle className="prefix__st0" cx={108} cy={74.1} r={15.5} />
          <path
            transform="rotate(-66.66 87.18 116.14)"
            className="prefix__st0"
            d="M38.7 114h96.9v4.3H38.7z"
          />
          <path
            transform="rotate(-9.425 58.623 79.609)"
            className="prefix__st0"
            d="M10.2 77.4h96.9v4.3H10.2z"
          />
          <path
            transform="rotate(-34.634 85.367 41.26)"
            className="prefix__st0"
            d="M83.2 4.3h4.3v73.9h-4.3z"
          />
          <path
            transform="rotate(-36.245 130.586 53.924)"
            className="prefix__st0"
            d="M100.6 51.7h60.1V56h-60.1z"
          />
          <path
            transform="rotate(-41.542 131.677 100.223)"
            className="prefix__st0"
            d="M129.5 62.1h4.3v76.3h-4.3z"
          />
        </svg>
      </SvgIcon>
    );

    return (
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
              <Tab label="List" icon={<DoubleChainIcon />} />
              <Tab label="Map" icon={<NetIcon />} />
            </Tabs>
          </Col>
        </Row>
        {tabState === 0 && (
          <ListsDisplay
            teamA={this.props.teamA}
            teamB={this.props.teamB}
            aToB={this.props.aToB}
            bToA={this.props.bToA}
          />
        )}
        {tabState === 1 && (
          <GraphDisplay
            teamA={this.props.teamA}
            teamB={this.props.teamB}
            aToB={this.props.aToB}
            bToA={this.props.bToA}
          />
        )}
      </div>
    );
  }
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField
} from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";
import "./style.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default class Expansion extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.params);
    this.state.sectionValue = 0.15;
    this.state.step = 0;
  }

  onStepChange = event => {
    const value = event.target.value;
    debugger;
    const step = parseInt(value);
    // if (!isNaN(step) && step != 0) {
    //   this.props.onStepChange(step);
    // }
    this.setState({ step: value });
  };

  onSectionValueChange = event => {
    const value = event.target.value;
    debugger;
    const sectionValue = parseInt(value);

    this.setState({ sectionValue: value });
  };

  render() {
    const props = this.props;
    const { step, sectionValue } = this.state;
    const labelStyle = { minWidth: "60px", display: "inline-block" };
    const inputStyle = { marginBottom: "10px" };

    const classes = {}; //useStyles();

    return (
      <div className="expansion">
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<SettingsIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>Intervals</h4>
            {/* <Range
              value={this.state.points}
              min={this.state.min}
              max={this.state.max}
              step={this.state.step}
              marks={marks}
              onChange={log}
              onChange={this.onSliderChange}
              onAfterChange={this.onAfterChange}
              tipProps={{ visible: true }}
            /> */}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <label style={labelStyle}>Step: </label>
            <input
              type="number"
              value={this.state.step}
              onChange={this.onStepChange}
              style={inputStyle}
            />
            <label style={labelStyle}>Section weight: </label>
            <input
              type="number"
              value={this.state.sectionValue}
              onChange={this.onSectionValueChange}
              style={inputStyle}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

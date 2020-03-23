import React from "react";
import { Button } from "@material-ui/core";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "./style.css";

export default class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);

    const min = -10;
    const max = 10;

    this.state = {
      min,
      max,
      step: 1,

      values: [],
      intervalValue: 0,
      sectionValue: 0.15
    };
  }
  render() {
    return (
      <div className="inputs">
        <h4> Section settings</h4>
        <label style={labelStyle}>Min: </label>
        <input
          type="number"
          value={this.state.min}
          onChange={this.onMinChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Max: </label>
        <input
          type="number"
          value={this.state.max}
          onChange={this.onMaxChange}
          style={inputStyle}
        />

        {/* <label style={labelStyle}>Step: </label>
        <input
          type="number"
          value={this.state.step}
          onChange={this.onStepChange}
          style={inputStyle}
        /> */}
        <label style={labelStyle}>Section weight: </label>
        <input
          type="number"
          value={this.state.sectionValue}
          onChange={this.onSectionValueChange}
          style={inputStyle}
        />
        <br />
        <br />
        <h4> Add interval</h4>
        <form onSubmit={this.onSubmit}>
          <label style={labelStyle}>Min: </label>
          <input id="newIntMin" type="number" />

          <label style={labelStyle}>Max: </label>
          <input id="newIntMax" type="number" />
          <label style={labelStyle}>Value: </label>
          <input
            id="newIntValue"
            type="number"
            onChange={this.onIntervalValueChange}
          />
          <br />
          <Button variant="outlined" onClick={this.updateMarks}>
            Add
          </Button>
        </form>
        <br />
      </div>
    );
  }
}

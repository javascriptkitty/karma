import "rc-slider/assets/index.css";
import React from "react";
import { Button } from "@material-ui/core";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "./style.css";

const Range = createSliderWithTooltip(Slider.Range);

function log(value) {
  console.log(value); //eslint-disable-line
}
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

  onSliderChange = values => {
    log(values);
    this.setState({ values });
  };
  onAfterChange = value => {
    console.log(value); //eslint-disable-line
  };
  onMinChange = e => {
    this.setState({
      min: parseInt(e.target.value)
    });
  };
  onIntervalValueChange = e => {
    this.setState({
      intervalValue: +e.target.value || 0
    });
  };
  onMaxChange = e => {
    debugger;
    this.setState({
      max: parseInt(e.target.value)
    });
  };
  onStepChange = e => {
    this.setState({
      step: +e.target.value || 1
    });
  };
  onSectionValueChange = event => {
    this.setState({ sectionValue: event.target.value });
  };
  updateMarks = () => {
    const min = document.getElementById("newIntMin").value;
    const max = document.getElementById("newIntMax").value;
    const value = document.getElementById("newIntValue").value;
    debugger;
    const newValue = this.state.values.concat([parseInt(min), parseInt(max)]);
    this.setState({
      //   marks: {
      //     [min]: min,
      //     [max]: max
      //   },
      values: newValue
    });
    document.getElementById("newIntMin").value = "";
    document.getElementById("newIntMax").value = "";
    document.getElementById("newIntValue").value = "";
  };
  render() {
    const labelStyle = { minWidth: "60px", display: "inline-block" };
    const inputStyle = { marginBottom: "10px" };

    const { min, max } = this.state;
    const marks = {
      [min]: <strong>{min}</strong>,
      [max]: <strong>{max}</strong>
    };

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

        <br />
        <br />
        <Range
          value={this.state.values}
          min={this.state.min}
          max={this.state.max}
          step={this.state.step}
          marks={marks}
          onChange={log}
          onChange={this.onSliderChange}
          onAfterChange={this.onAfterChange}
          tipProps={{ visible: true }}
        />
      </div>
    );
  }
}

// ReactDOM.render(
//   <div>
//     <div style={style}>
//       <p>Slider with dynamic `min` `max` `step`</p>
//       <DynamicBounds />
//     </div>
//   </div>,
//   document.getElementById("__react-content")
// );

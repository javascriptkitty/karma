import "rc-slider/assets/index.css";
import React from "react";
import { Button } from "@material-ui/core";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "./style.css";

const SliderWithTooltip = createSliderWithTooltip(Slider);

function log(value) {
  console.log(value); //eslint-disable-line
}
export default class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: -10,
      max: 10,
      step: 1,
      value: [1, 2],
      intervalValue: 0,
      marks: {}
    };
  }

  componentDidMount() {
    this.setState({
      marks: {
        [this.state.min]: {
          label: <strong>{this.state.min}</strong>
        },
        [this.state.max]: {
          label: <strong>{[this.state.max]}</strong>
        }
      }
    });
  }

  onSliderChange = value => {
    log(value);
    this.setState({ value });
  };
  onAfterChange = value => {
    console.log(value); //eslint-disable-line
  };
  onMinChange = e => {
    this.setState({
      min: +e.target.value || 0,
      marks: {
        [e.target.value]: {
          label: <strong>{e.target.value}</strong>
        }
      }
    });
  };
  onIntervalValueChange = e => {
    this.setState({
      intervalValue: +e.target.value || 0
    });
  };
  onMaxChange = e => {
    this.setState({
      max: +e.target.value || 100
    });
  };
  onStepChange = e => {
    this.setState({
      step: +e.target.value || 1
    });
  };
  updateMarks = () => {
    const min = document.getElementById("newIntMin").value;
    const max = document.getElementById("newIntMax").value;
    const value = document.getElementById("newIntValue").value;
    debugger;
    this.setState({
      marks: {
        [min]: min,
        [max]: max
      }
    });
  };
  render() {
    const labelStyle = { minWidth: "60px", display: "inline-block" };
    const inputStyle = { marginBottom: "10px" };

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
        <label style={labelStyle}>Step: </label>
        <input
          type="number"
          value={this.state.step}
          onChange={this.onStepChange}
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
        <SliderWithTooltip
          //   value={this.state.value}
          min={this.state.min}
          max={this.state.max}
          step={this.state.step}
          marks={this.state.marks}
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

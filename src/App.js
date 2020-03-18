import React, { Component } from "react";

import { Card, CardContent } from "@material-ui/core";
//import clsx from "clsx";

import DiscreteSlider from "./components/DiscreteSlider";
import Expansion from "./components/Expansion";
import DynamicBounds from "./components/Slider";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marks: [
        // { label: "<1", value: "(-inf; 1)" },
        // { label: "1,1", value: "(-inf; 1)" }
      ],
      step: 0.2,
      min: 0,
      max: 2,
      sectionValue: 0.15,
      stepValue: 3
    };
  }
  getMarks = () => {
    console.log(this.state);
    debugger;
    let marks = [];
    let el = {};
    for (let i = this.state.min; i <= this.state.max; i = i + this.state.step) {
      el.label = i.toFixed(1);
      el.value = null;
      marks.push(el);
    }
    this.setState({ marks: marks });
  };

  onStepChange = step => {
    this.setState({ step });

    this.getMarks();
  };

  onMinChange = min => {
    this.setState({ min });
  };

  onMaxChange = max => {
    this.setState({ max });
  };

  onSectionValueChange = event => {
    this.setState({ sectionValue: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <Card>
          <Expansion
            params={this.state}
            onSubmit={this.onSubmit}
            onMinChange={this.onMinChange}
            onMaxChange={this.onMaxChange}
            onSectionValueChange={this.onSectionValueChange}
            onStepChange={this.onStepChange}
          />
          <CardContent>
            <p>
              (искл. внутренние переводы, кредиты/займы, возвраты авансов и
              ошибочных платежей)
            </p>
            <DynamicBounds />
            <br /> <br /> <br />
            {/* <DiscreteSlider
              marks={this.state.marks}
              min={this.state.min}
              max={this.state.max}
              step={this.state.step}
            /> */}
          </CardContent>
        </Card>
      </div>
    );
  }
}

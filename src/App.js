import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Container, CardContent, Slider } from "@material-ui/core";

import Expansion from "./components/Expansion";
import DynamicBounds from "./components/Slider";
import data from "../src/data/data.json";
import axios from "axios";
import "./App.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAdd: true,
      step: 0.2,
      min: 0,
      max: 2,
      sectionValue: 0.15,
      stepValue: 3,
      metrics: []
    };
  }
  loadMetrics = () => {
    const url = `/api/`;

    // return axios
    //   .get(url)
    //   .then(res => {
    //     console.log(res.data);
    this.setState({
      //     metrics: res.data
      metrics: data.metrics
    });
    //   })
    //   .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadMetrics();
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
    const classes = {};
    return (
      <Container className="App">
        <br /> <br /> <br />
        {this.state.metrics.map((section, index) => {
          return (
            <Card className={classes.root} variant="outlined" key={index}>
              <CardContent>
                {" "}
                <h4>{section.title}</h4>
                <br />
                <div className="expansion-interval">
                  <br />
                  <Expansion
                    onSectionValueChange={this.onSectionValueChange}
                    onStepChange={this.onStepChange}
                  />
                  <DynamicBounds />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    );
  }
}

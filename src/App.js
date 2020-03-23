import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Container, CardContent, Slider } from "@material-ui/core";

import Expansion from "./components/Expansion";
import DynamicBounds from "./components/Slider";
import "./App.css";

const sections = [
  {
    title:
      "Динамика по чистому обороту за 36 месяцев год к году = выр 2019 / ((выр 2017 + выр 2018)/2)",
    comment:
      "(искл. внутренние переводы, кредиты/займы, возвраты авансов и ошибочных платежей)"
  },
  {
    title: "Сальдо погашенных к полученным кредитам/займам за 24 мес.",
    comment: ""
  },
  {
    title: "Объем уплаченных налогов в % от выручки за 12 месяцев",
    comment: "(искл внутренние переводы, кредиты/займы)"
  },
  {
    title:
      "Среднедневной объем остатка по счету за 6 мес. в % от среднемесячной выручки за 6 мес.",
    comment: "(искл. внутренние переводы, кредиты/займы)"
  },
  {
    title: "Дебиторы доля топ 3 за 12 мес.",
    comment: "(искл внутренние переводы, кредиты/займы)"
  },
  {
    title: "Дебиторы количество за 12 мес.",
    comment: "(искл внутренние переводы, кредиты/займы)"
  },
  {
    title: "Кредиторы доля топ 3 за 12 мес.",
    comment: "(искл внутренние переводы, кредиты/займы)"
  },
  {
    title: "Уплата аренды за 12 мес.",
    comment: "(искл внутренние переводы, кредиты/займы)"
  },
  {
    title:
      "Среднедневное количество поступлений по кредитовому обороту счета за 6 мес.",
    comment:
      "(искл внутренние переводы, кредиты/займы, возвраты авансов и ошибочных)"
  },
  {
    title: "Доля расчетов наличными (поступления/снятия) за 12 мес.",
    comment: ""
  }
];

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
    const classes = {};
    return (
      <Container className="App">
        <br /> <br /> <br />
        {sections.map((section, index) => {
          return (
            <Card className={classes.root} variant="outlined" key={index}>
              <CardContent>
                {" "}
                <h4>{section.title}</h4>
                <span>{section.comment}</span>
                <br />
                <div className="expansion-interval">
                  <h4>Intervals</h4>
                  <br />

                  {/* <div className="titles">
                    <span> </span>
                    <span>point</span>
                    <span>value</span>
                  </div> */}
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

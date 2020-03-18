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
  }

  onMinChange = event => {
    const value = event.target.value;

    const min = parseInt(value);
    if (!isNaN(min)) {
      this.props.onMinChange(min);
    }
    this.setState({ min: value });
  };
  onMaxChange = event => {
    const value = event.target.value;

    const max = parseInt(value);
    if (!isNaN(max)) {
      this.props.onMaxChange(max);
    }
    this.setState({ max: value });
  };
  onStepChange = event => {
    const value = event.target.value;
    debugger;
    const step = parseInt(value);
    if (!isNaN(step) && step != 0) {
      this.props.onStepChange(step);
    }
    this.setState({ step: value });
  };

  render() {
    const props = this.props;
    const { min, max, step, sectionValue } = this.state;
    const classes = {}; //useStyles();

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<SettingsIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>
              Динамика по чистому обороту за 36 месяцев год к году = выр 2019 /
              ((выр 2017 + выр 2018)/2)
            </h4>
            <p>
              (искл. внутренние переводы, кредиты/займы, возвраты авансов и
              ошибочных платежей)
            </p>
          </ExpansionPanelSummary>
          {/* <ExpansionPanelDetails>
            <form>
              <div className="expansion-interval">
                <span>Interval</span>
                <div>
                  <TextField
                    id="min"
                    value={min}
                    label="min"
                    type="number"
                    onChange={this.onMinChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                  <TextField
                    id="max"
                    label="max"
                    type="number"
                    value={max}
                    className={classes.textField}
                    onChange={this.onMaxChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </div>
              </div>
              <TextField
                id="step"
                label="Step"
                value={step}
                className={classes.textField}
                onChange={this.onStepChange}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />

              <TextField
                id="sectionValue"
                label="Section value"
                type="number"
                value={sectionValue}
                className={classes.textField}
                onChange={props.onSectionValueChange}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </form>
          </ExpansionPanelDetails>*/}
        </ExpansionPanel>
      </div>
    );
  }
}

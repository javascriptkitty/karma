import "rc-slider/assets/index.css";
import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  TextField,
  Select,
  FormControl,
  Dialog,
  TableCell,
  TableHead,
  TableRow,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import Slider, { createSliderWithTooltip } from "rc-slider";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./style.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Range = createSliderWithTooltip(Slider.Range);

function log(value) {
  console.log(value); //eslint-disable-line
}

export default class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intervals: [
        {
          id: this.intervalId++,
          threshold: Infinity,
          value: 0,
          inclusive: false
        }
      ],
      showAdd: true,
      isOpenAlert: false
    };
  }

  validateInterval(interval) {
    const { intervals } = this.state;
    const last = interval;

    for (let i = 0; i < intervals.length; i++) {
      if (intervals[i].threshold == last.threshold) {
        return false;
      }
    }

    return true;
  }

  intervalId = 0;

  onDone = (index, interval) => {
    if (!this.validateInterval(interval)) {
      this.setState({ isOpenAlert: true });
      return;
    }

    if (index == null) {
      interval.id = this.intervalId++;
      this.setState({
        intervals: this.state.intervals.concat(interval),
        showAdd: true
      });
    } else {
      const intervals = [...this.state.intervals];
      intervals[index] = interval;
      this.setState({ intervals, showAdd: true });
    }
  };
  changeShowAdd = () => {
    this.setState({
      showAdd: !this.state.showAdd
    });
  };
  handleClose = () => {
    this.setState({
      isOpenAlert: false
    });
  };
  render() {
    debugger;
    let { intervals, isOpenAlert } = this.state;

    intervals.sort((a, b) => (a.threshold > b.threshold ? 1 : -1));

    debugger;
    let lastInterval = null;
    const views = intervals.map((interval, i) => {
      const res = (
        <EditInterval
          key={interval.id}
          lastInterval={lastInterval}
          interval={interval}
          mode="view"
          onDone={this.onDone}
          index={i}
        />
      );
      lastInterval = interval;
      return res;
    });

    return (
      <div>
        {this.state.intervals.length > 0 ? (
          <TableHead>
            <TableRow>
              <TableCell>interval</TableCell>
              <TableCell>value</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
        ) : null}
        {views}
        {this.state.showAdd ? (
          <IconButton onClick={this.changeShowAdd}>
            <AddCircleOutlineIcon />
          </IconButton>
        ) : (
          <EditInterval
            mode="add"
            onDone={this.onDone}
            index={null}
            intervals={this.state.intervals}
          />
        )}
        {isOpenAlert ? (
          <Dialog open={true} onClose={this.handleClose}>
            This is an error interval!
            <Button onClick={this.handleClose} color="primary">
              ok
            </Button>
          </Dialog>
        ) : null}
      </div>
    );
  }
}

const defaultState = {
  inclusive: "true",
  threshold: "",
  value: "",
  mode: "add",
  isOpenAlert: false
};
export class EditInterval extends React.Component {
  constructor(props) {
    super(props);

    let state;
    if (props.mode === "add") {
      state = {
        ...defaultState
      };
    } else {
      state = { ...props.interval, lastInterval: props.lastInterval };
      state.mode = props.mode;
    }
    this.state = state;
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ ...props.interval, lastInterval: props.lastInterval });
  }

  onChangeInclusive = event => {
    this.setState({ inclusive: event.target.value });
  };

  onChangeThreshold = event => {
    this.setState({ threshold: event.target.value });
  };

  onChangeValue = event => {
    this.setState({ value: event.target.value });
  };

  onAdd = () => {
    let { inclusive, threshold, value } = this.state;
    debugger;
    this.props.onDone(this.props.index, {
      inclusive: inclusive === "true",
      threshold: parseFloat(threshold),
      value: parseFloat(value)
    });

    if (this.props.index == null) {
      this.setState({ ...defaultState });
    } else {
      this.setState({ mode: "view" });
    }
  };
  onEditInterval = () => {
    this.setState({
      mode: "edit"
    });
  };

  // [)
  renderInterval() {
    const { inclusive, threshold, lastInterval } = this.state;
    console.log(lastInterval);
    return (
      <span>
        {lastInterval && lastInterval.inclusive ? "[" : "("}
        {lastInterval ? lastInterval.threshold : "(-∞"}
        ,&nbsp;
        {threshold === Infinity ? "∞" : threshold}
        {inclusive ? "]" : ")"}
      </span>
    );
  }

  renderView() {
    const { inclusive, threshold, value } = this.state;

    return (
      <div className="interval-line">
        {this.renderInterval()}
        <span> {value} </span>
        <IconButton onClick={this.onEditInterval}>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }

  renderEditAdd() {
    const classes = {};
    const { inclusive, threshold, value, mode } = this.state;

    let label;
    if (mode === "add") {
      label = "Add";
    } else if (mode === "edit") {
      label = "Done";
    } else if (mode === "view") {
      label = "Edit";
    }

    return (
      <div className="interval-add">
        <FormControl variant="outlined">
          <Select
            native
            onChange={this.onChangeInclusive}
            value={inclusive}
            inputProps={{
              shrink: true
            }}
          >
            <option value="true">&le;</option>
            <option value="false">&lt;</option>
          </Select>
        </FormControl>
        {threshold === Infinity ? (
          "8"
        ) : (
          <TextField
            id="point"
            label="POINT"
            type="number"
            value={threshold}
            onChange={this.onChangeThreshold}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        )}
        <TextField
          id="value"
          label="VALUE"
          value={value}
          // defaultValue="0"
          onChange={this.onChangeValue}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <Button variant="outlined" onClick={this.onAdd}>
          {label}
        </Button>
      </div>
    );
  }

  render() {
    const { mode } = this.state;

    if (mode === "edit" || mode === "add") {
      return this.renderEditAdd();
    }
    return this.renderView();
  }
}

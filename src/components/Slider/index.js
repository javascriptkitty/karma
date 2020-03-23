import "rc-slider/assets/index.css";
import React, { Fragment } from "react";
import {
  Button,
  IconButton,
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

export function AddInterval(props) {
  const labelStyle = { minWidth: "60px", display: "inline-block" };
  const inputStyle = { marginBottom: "10px" };
  const { index, points } = props;
  debugger;
  return (
    <div className="interval-line">
      {index == 0 ? <div>{`> ${points[index]}`}</div> : null}
      {index == points.length - 1 ? <div>{`< ${points[index]}`}</div> : null}
      {index !== 0 && index !== points.length - 1 ? (
        <div>{`${points[index]} - ${points[index + 1]}`}</div>
      ) : null}
      <label style={labelStyle}>Value: </label>
      <input
        id="newIntValue"
        type="number"
        // onChange={props.onIntervalValueChange}
      />
      <Button variant="outlined" size="small">
        <EditIcon />
      </Button>
      <Button variant="outlined" size="small">
        <DeleteIcon />
      </Button>
    </div>
  );
}
// export default class DynamicBounds extends React.Component {
//   constructor(props) {
//     super(props);

//     // this.state = {
//     //   step: 1,
//     //   points: [],
//     //   values: [],
//     //   sectionValue: 0.15,
//     //   intervals: [],
//     //   showAdd: true
//     // };
//     this.state = {
//       intervals: []
//     };
//   }

//   changeShowAdd = () => {
//     this.setState({
//       showAdd: !this.state.showAdd
//     });
//   };

//   renderAddInterval = () => {
//     const points = this.state.points;
//     const intervals = [];
//     for (let i = 0; i < points.length; i++) {
//       intervals.push(
//         <AddInterval
//           key={i}
//           index={i}
//           points={this.state.points}
//           onIntervalValueChange={this.onIntervalValueChange}
//         />
//       );
//     }
//     return intervals;
//   };

//   onSliderChange = values => {
//     log(values);
//     this.setState({ values });
//   };
//   onAfterChange = value => {
//     console.log(value); //eslint-disable-line
//   };

//   onIntervalValueChange = e => {
//     this.setState({
//       intervalValue: +e.target.value || 0
//     });
//   };

//   onStepChange = e => {
//     this.setState({
//       step: +e.target.value || 1
//     });
//   };
//   onSectionValueChange = event => {
//     this.setState({ sectionValue: event.target.value });
//   };

//   updateMarks = () => {
//     const point = 1.0;

//     const newValue = this.state.values.concat([parseInt(point)]);
//     const newPoints = this.state.points.concat([parseInt(point)]);
//     this.setState({
//       values: newValue,
//       points: newPoints,
//       showAdd: true
//     });
//   };

//   render() {
//     const labelStyle = { minWidth: "60px", display: "inline-block" };
//     const inputStyle = { marginBottom: "10px" };

//     const { min, max } = this.state;
//     const marks = {};

//     return (
//       <div className="inputs">
//         <ExpansionPanel>
//           <ExpansionPanelSummary
//             expandIcon={<SettingsIcon />}
//             aria-controls="panel1a-content"
//             id="panel1a-header"
//           >
//             <Range
//               value={this.state.points}
//               min={this.state.min}
//               max={this.state.max}
//               step={this.state.step}
//               marks={marks}
//               onChange={log}
//               onChange={this.onSliderChange}
//               onAfterChange={this.onAfterChange}
//               tipProps={{ visible: true }}
//             />
//           </ExpansionPanelSummary>
//           <ExpansionPanelDetails>
//             <label style={labelStyle}>Step: </label>
//             <input
//               type="number"
//               value={this.state.step}
//               onChange={this.onStepChange}
//               style={inputStyle}
//             />
//             <label style={labelStyle}>Section weight: </label>
//             <input
//               type="number"
//               value={this.state.sectionValue}
//               onChange={this.onSectionValueChange}
//               style={inputStyle}
//             />
//             <br /> <h3> Intervals</h3>
//             <div>
//               {this.renderAddInterval()} <br />
//             </div>
//             {this.state.showAdd ? (
//               <IconButton onClick={this.changeShowAdd}>
//                 <AddCircleOutlineIcon />
//               </IconButton>
//             ) : (
//               <form>
//                 {" "}
//                 <label style={labelStyle}>Point: </label>
//                 <input id="newPoint" type="number" />
//                 <br />
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   onClick={this.updateMarks}
//                 >
//                   Add
//                 </Button>
//               </form>
//             )}
//             <br />
//           </ExpansionPanelDetails>
//         </ExpansionPanel>
//       </div>
//     );
//   }
// }

export default class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intervals: []
    };
  }

  onDone = (index, interval) => {
    debugger;
    if (index == null) {
      this.setState({ intervals: this.state.intervals.concat(interval) });
    } else {
      const intervals = this.state.intervals;
      intervals[index] = interval;
      this.setState({ intervals });
    }
  };

  render() {
    const views = this.state.intervals.map((interval, i) => (
      <EditInterval
        key={i}
        interval={interval}
        mode="view"
        onDone={this.onDone}
        index={i}
      />
    ));

    return (
      <div>
        {views}
        <EditInterval mode="add" onDone={this.onDone} index={null} />
      </div>
    );
  }
}

const defaultState = {
  inclusive: "true",
  threshold: "",
  value: "",
  mode: "add"
};
export class EditInterval extends React.Component {
  constructor(props) {
    super(props);

    let state;
    if (props.mode === "add") {
      state = { ...defaultState };
    } else {
      state = { ...props.interval };
      state.mode = props.mode;
    }
    this.state = state;
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
    const { inclusive, threshold, value } = this.state;

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

  renderView() {
    const { inclusive, threshold, value } = this.state;

    return (
      <div>
        When <span>{inclusive ? "<=" : "<"}</span> &nbsp;
        <span>{threshold}</span> value is
        <span> {value} </span>
        <button onClick={this.onEditInterval}>edit</button>
        <button>delete</button>
      </div>
    );
  }
  renderEditAdd() {
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
      <div>
        <select onChange={this.onChangeInclusive} value={inclusive}>
          <option value="true">&lt;=</option>
          <option value="false">&lt;</option>
        </select>

        <input value={threshold} onChange={this.onChangeThreshold} />
        <input value={value} onChange={this.onChangeValue} />
        <button onClick={this.onAdd}>{label}</button>
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

// Threshold     Value
// < 1           0.15
// <= 2          0.09
// < 10          1.5

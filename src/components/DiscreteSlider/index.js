import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  },
  margin: {
    height: theme.spacing(3)
  }
}));

// const marks = [
//   {
//     value: 0,
//     label: "0"
//   },
//   {
//     value: 0.2,
//     label: "0.2"
//   },
//   {
//     value: 0.4,
//     label: "0.4"
//   },
//   {
//     value: 0.6,
//     label: "0.6"
//   }
// ];

function valuetext(value) {
  return `${value}°C`;
}

// function valueLabelFormat(value) {
//   return marks.findIndex(mark => mark.value === value) + 1;
// }

export default function DiscreteSlider(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={[]}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        track={false}
        // valueLabelDisplay="auto"
        valueLabelDisplay="on"
        step={props.step}
        marks={true}
        // marks={props.marks}
        min={props.min}
        max={props.max}
      />
      <div className={classes.margin} />
    </div>
  );
}

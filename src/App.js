import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardContent,
  IconButton,
  Collapse
} from "@material-ui/core";
import clsx from "clsx";
import SettingsIcon from "@material-ui/icons/Settings";
import DiscreteSlider from "./components/DiscreteSlider";
import Expansion from "./components/Expansion";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Card>
        <Expansion />
        <CardContent>
          <p>
            (искл. внутренние переводы, кредиты/займы, возвраты авансов и
            ошибочных платежей)
          </p>

          <DiscreteSlider />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;

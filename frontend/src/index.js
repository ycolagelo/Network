import { render } from "react-dom";
import React from "react";
import App from "./App";
import "../tailwind.css";

const container = document.getElementById("app");
render(<App />, container);

import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { App } from "./components/App";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
  document.getElementById("root")
);

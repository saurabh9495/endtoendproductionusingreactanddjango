import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import App from "./Application";

// require('@synopsys-sig/seeker-inline');

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

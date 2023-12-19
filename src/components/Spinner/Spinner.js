import React, { Component } from "react";
import "./spinner.css";

class Spinner extends Component {
  render() {
    return (
      <div className="SpinnerOverlay">
        <div className="SpinnerContainer" />
      </div>
    );
  }
}

export default Spinner;

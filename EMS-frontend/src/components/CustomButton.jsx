import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

function CustomButton({ customstyle, text }) {
  return <button className={`btn fw-bold ${customstyle}`}>{text}</button>;
}

export default CustomButton;

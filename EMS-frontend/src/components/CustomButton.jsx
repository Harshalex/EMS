import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

function CustomButton({
  customstyle,
  text,
  icon,
  iconLeft = true,
  type,
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn fw-bold d-flex justify-content-center align-items-center gap-2 ${customstyle}`}
    >
      {icon && iconLeft && (
        <span>
          <img src={icon} alt="" />
        </span>
      )}
      {text}
      {icon && iconLeft == false && (
        <span>
          <img src={icon} alt="" />
        </span>
      )}
    </button>
  );
}

export default CustomButton;

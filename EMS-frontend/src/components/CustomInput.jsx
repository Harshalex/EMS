import React from "react";

const CustomInput = ({ type, name, value, onChange, placeholder, icon }) => {
  return (
    <div className="input-group">
      {icon && <img src={icon} alt="" className="icon" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="login-input"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default CustomInput;

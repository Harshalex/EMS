import React from "react";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  className = "",
  style = {},
  name,
  disabled,
}) => {
  return (
    <select
      disabled={disabled}
      className={`form-select ${className}`}
      style={style}
      value={value}
      onChange={onChange}
      name={name}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt, index) => (
        <option key={index} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;

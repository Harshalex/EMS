import React from "react";

const CustomInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  icon,
  isRight = false,
  error,
  style,
  classnames,
}) => {
  return (
    <div>
      <div className="">
        {icon && !isRight && <img src={icon} alt="" className="icon" />}
        <input
          style={style}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={classnames ? `${classnames} login-input` : "login-input"}
          placeholder={placeholder}
          required
        />
        {icon && isRight && <img src={icon} alt="" className="icon" />}
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CustomInput;

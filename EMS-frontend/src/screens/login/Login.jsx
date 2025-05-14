import React, { useState } from "react";
import "./login.css";
import "../../constants/global.css";
import { imagePath } from "../../constants/imagePath";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("HAndle Submit");
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://192.168.1.43:5000/auth/login",
        formData
      );
      const { token, sendUser: user } = res.data.result;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (err) {
      console.error("Login Failed:", err);
    } finally {
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-row">
        <div className="login-left">
          <form onSubmit={handleSubmit}>
            <div className="logo">
              <img src={imagePath.Logo} alt="Logo" />
            </div>

            <h4 className="login-title">Employee Login</h4>
            <div className="input-group">
              <CustomInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                icon={imagePath.MessageIcon}
              />
            </div>
            <div className="input-group">
              <CustomInput
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                icon={imagePath.Lock}
              />
            </div>

            <div className="forgot-link">
              <a href="#">Forgot password?</a>
            </div>

            <div className="login-button">
              <CustomButton
                onClick={handleSubmit}
                customstyle={"text-white login-btn"}
                text={"Login"}
              />
            </div>

            <p className="login-help">
              <span className="text-help">Need help?</span> Contact your
              administrator
            </p>
          </form>
        </div>

        <div className="login-right">
          <img
            src={imagePath.LoginBgOut}
            alt="background"
            className="woman-img background-img"
          />
          <img src={imagePath.LoginBg} alt="women" className="second-img" />
        </div>
      </div>
    </div>
  );
};

export default Login;

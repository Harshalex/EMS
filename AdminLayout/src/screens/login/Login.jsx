import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { imagePath } from "../../constants/imagePath";

const Login = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-lightblue">
      <div className="row w-100" style={{ maxWidth: "1000px" }}>
        {/* Left Side */}
        <div className="col-lg-6 bg-white p-5 rounded-start shadow">
          <div className="mb-4">
            <img src={imagePath.Logo} alt="Logo" style={{ height: "50px" }} />
          </div>

          <h4 className="mb-4">Employee Login</h4>

          <div className="mb-3">
            <label className="form-label">
              <i className="me-2 bi bi-envelope"></i>
              Enter your email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="me-2 bi bi-lock"></i>
              Enter your password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3">
            <a href="#" className="text-decoration-none">
              Forgot password?
            </a>
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary">Login</button>
          </div>

          <p className="text-muted">
            <span className="text-danger">Need help?</span> Contact your
            administrator
          </p>
        </div>

        {/* Right Side */}
        <div className="col-lg-6 d-none d-lg-flex bg-darkblue text-white rounded-end p-4 position-relative overflow-hidden">
          <div className="text-box text-start z-2">
            <h5>
              <span className="text-warning fw-bold">Very good</span>{" "}
              <span className="fw-bold text-warning">works</span> are <br />
              waiting for <strong>You</strong>
            </h5>
          </div>

          {/* Woman Image */}
          <img
            src={imagePath.LoginBg}
            alt="Woman"
            className="woman-img position-absolute"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

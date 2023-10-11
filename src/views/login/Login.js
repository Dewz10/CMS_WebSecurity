import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
import kuLogo from "../../assets/ku-logo.png";


function Login({ onLogin, authenticatedUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const [signInClicked, setSignInClicked] = useState(false);
  const navigate = useNavigate();

  const handleReloadAndNavigate = (url) => {
    window.location.reload();
    window.location.href = url;
  };

  const handleLogin = () => {
    setSignInClicked(true);
    const isAuthenticated = onLogin(username, password, selectedRole);
    console.log(isAuthenticated);
    localStorage.setItem("authenticatedUser", selectedRole);
    if (true) {
      switch (selectedRole) {
        case "student":
          handleReloadAndNavigate("/news");
          break;
        case "company":
          handleReloadAndNavigate("/comregisters");
          break;
        case "admin":
          handleReloadAndNavigate("/openrounds");
          break;
        default:
          handleReloadAndNavigate("/login");
      }
    } else {
      // Handle authentication failure (e.g., display an error message)
    }
  };
  

  useEffect(() => {
    if (signInClicked && authenticatedUser === null) {
      navigate("/login");
    }
  }, [signInClicked, authenticatedUser, navigate]);

  return (
    <div className="login-frame">
      <div className="logo">
      <img src={kuLogo} alt="ku-logo" width="110px" height="130" />
      </div>
          <div className="label-login">
            <h2>เข้าสู่ระบบยื่นคำร้องฝึกงาน</h2>
          </div>
          <div className="card-body">
            <label htmlFor="email_input">บัญชีผู้ใช้</label>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Username"
                id="email_input"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <label htmlFor="password_input">รหัสผ่าน</label>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                id="password_input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label>Select Role:</label>
              <select
                className="form-control"
                onChange={(e) => setSelectedRole(e.target.value)}
                value={selectedRole}
              >
                <option value="student">Student</option>
                <option value="company">Company</option>
                <option value="admin">Admin</option>
              </select>
            </div>
              <div className="col-8">
                {/* <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div> */}
              </div>
              <div className="input-div">
                <button
                  className="btn-login"
                  onClick={handleLogin}
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            {/* <p className="mb-0">
              <a href="register.html" className="text-center">
                Register a new membership
              </a>
            </p> */}
          </div>
        </div>

  );
}

export default Login;

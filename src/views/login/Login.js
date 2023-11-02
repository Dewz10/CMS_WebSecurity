import React, { useState } from "react";
import "./login.css";
import kuLogo from "../../assets/ku-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from 'crypto-js'
import Swal from "sweetalert2";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        const role = data.data.res.role;
        let access_token = data.data.tokens.access_token;

        // Store the JWT tokens securely in localStorage
        localStorage.setItem("access_token", access_token);

        // Ensure that access_token has been set before calling onLogin
        if (access_token !== null) {
          console.log(data.data.res);
          onLogin(role, data.data.res, access_token);
        } else {
          console.error("Access token not received.");
        }
      } else {
        console.error("Authentication failed.");
      }
    } catch (error) {
      console.error("An error occurred.", error);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Invalid username or password'
      })
    }
  };

  return (
    <div className="login-frame">
      <div className="logo">
        <img src={kuLogo} alt="ku-logo" width="110px" height="130" />
      </div>
      <div className="label-login">
        <h2 style={{ fontSize: 20 }}>เข้าสู่ระบบยื่นคำร้องฝึกงาน</h2>
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
        <div className="submit-button">
          <button
            type="button"
            className="btn-login"
            onClick={handleLogin}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "./login.css";
import kuLogo from "../../assets/ku-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const AES = require('../../services/encrypt_decrypt')

function Login({ onLogin }) {
  const [formData,setFormData] = useState({
    username: "",
    password: ""
  })
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isDisable,setIsDisable] = useState(false)
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + "." + (seconds < 10 ? '0' : '') + seconds;
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: AES.encrypt(e.target.value)
    })
  }
  const handleLogin = async () => {
    try {
      //const encryptBody = AES.encrypt(formData)
      //console.log(encryptBody)
      const response = await axios.post("https://localhost:3000/auth/login", formData);
      console.log(response.status)

      if (response.status === 200) {
        const data = response.data.data;
        console.log(data)
        const decrypted = JSON.parse(AES.decrypt(data));
        let role = decrypted.plainUser.role
        let access_token = decrypted.tokens.access_token

        // Store the JWT tokens securely in localStorage
        localStorage.setItem("access_token", access_token);

        // Ensure that access_token has been set before calling onLogin
        if (access_token !== null) {
  
          onLogin(role, decrypted.plainUser, access_token);
        } else {
          console.error("Access token not received.");
        }
      }else if(response.status === 400) {
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
          title: response.data.message
        })
      }
    } catch (error) {
      //console.log(error.response.status)
      if(error?.response?.status === 400) {
        const date = new Date()
        const suspendDate = new Date(error.response.data.message.time)
        let millis = suspendDate.getTime() - date.getTime()
        const time = millisToMinutesAndSeconds(millis)
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
          title: 'Too many attempts to Login, try again in '+time+' minutes'
        })
      }
      else {
        console.error("Authentication failed.");
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
      console.error("An error occurred.", error);
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
            name='username'
            onChange={handleChange}
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
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
            name="password"
            onChange={handleChange}
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

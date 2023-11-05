import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import News from "./views/students/News";
import CheckStatus from "./views/students/CheckStatus";
import Form from "./views/students/Form";
import Login from "./views/login/Login";
import FormCompany from "./views/company/FormCompany";
import OpenRound from "./views/admin/OpenRound";
import ManageRequest from "./views/admin/ManageRequest";
import AddCompany from "./views/admin/AddCompany";
import CheckStatusCompany from "./views/company/CheckStatusCompany";
import jwt_decode from "jwt-decode";
import axios from "axios";
import UpdateForm from "./views/students/UpdateForm";
import UpdateFormCompany from "./views/company/UpdateFormCompany";
import NotFound from "./views/pageHandle/NotFound";
import FormView from "./views/admin/FormView"
import CheckDetail from "./views/students/CheckDetail";
import CheckDetailCompany from "./views/company/CheckDetailCompany";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleReloadAndNavigate = (url) => {
    navigate(url);
  };

  const handleLogout = () => {
    // Clear the access token from localStorage on logout
    localStorage.removeItem("access_token");
    setAuthenticatedUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        return;
      }

      let decodedToken = jwt_decode(access_token);
      const currentTime = new Date().getTime();

      if (decodedToken.exp * 1000 - currentTime < 60000) {
        const refresh_token = localStorage.getItem("refresh_token");

        if (!refresh_token) {
          navigate("/login");
          return;
        }

        const response = await axios.post(
          "https://localhost:3000/auth/refresh-tokens",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token }),
          }
        );

        if (response.status === 200) {
          const data = await response.data;
          const tokens = data.tokens;
          const newAccessToken = tokens.access_token;

          // Update the access token in localStorage
          localStorage.setItem("access_token", newAccessToken);

          // Set the updated access token in the decoded token to get the latest user role
          decodedToken = jwt_decode(newAccessToken);

          setAuthenticatedUser(decodedToken.role);
          setUserData(data.res);
        } else {
          console.error("Refresh token failed.");
        }
      }
    } catch (error) {
      console.error(
        "An error occurred while refreshing the access token.",
        error
      );
    }
  };

  const fetchUserData = async () => {
    try {
      // ดึง token จาก localStorage
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        console.error("ไม่มี access token");
        return;
      }

      // สร้างคำร้องขอ (request) และแนบ access token ใน header
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get("https://localhost:3000/auth/profile", {
        headers,
      });

      if (response.status === 200) {
        const userDataResponse = response.data;
        setUserData(userDataResponse);
        setLoading(false);
      } else {
        console.error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", error);
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
  
    if (access_token) {
      const decodedToken = jwt_decode(access_token);
      setAuthenticatedUser(decodedToken.role);
  
      const tokenExpiration = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();
  
      if (tokenExpiration - currentTime < 60000) {
        refreshAccessToken().then(() => {
          fetchUserData();
        });
      } else {
        fetchUserData();
      }
    } else {
      // เพิ่ม setTimeout ในนี้เพื่อหยุดการโหลดหน้าหลังจากเวลาที่คุณต้องการ
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      navigate("/login");
    }
  }, [navigate]);
  

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                onLogin={(role, userData) => {
                  setAuthenticatedUser(role);
                  setUserData(userData);

                  if (role === "user") {
                    handleReloadAndNavigate("/news");
                  } else if (role === "company") {
                    handleReloadAndNavigate("/comregisters");
                  } else if (role === "admin") {
                    handleReloadAndNavigate("/openrounds");
                  } else {
                    handleLogout();
                    handleReloadAndNavigate("/login");
                  }
                }}
              />
            }
          />

          {authenticatedUser === "user" && (
            <Route
              path="/"
              element={
                <React.Fragment>
                  <Header selectedRole="user" onLogout={handleLogout} />
                  <Menu selectedRole="user" userData={userData} />
                  <Outlet />
                </React.Fragment>
              }
            >
              <Route index element={<News userData={userData} />} />
              <Route path="news" element={<News userData={userData} />} />
              <Route
                path="register"
                element={<Form selectedRole={authenticatedUser} />}
              />
              <Route
                path="status"
                element={<CheckStatus selectedRole={authenticatedUser} />}
              />
              <Route
                path="update/:id"
                element={<UpdateForm selectedRole={authenticatedUser} />}
              />
              <Route
                path="detail/:id"
                element={<CheckDetail selectedRole={authenticatedUser} />}
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Route>
          )}

          {authenticatedUser === "company" && (
            <Route
              path="/"
              element={
                <React.Fragment>
                  <Header selectedRole="company" onLogout={handleLogout} />
                  <Menu selectedRole="company" userData={userData} />
                  <Outlet />
                </React.Fragment>
              }
            >
              <Route index element={<FormCompany />} />
              <Route path="comregisters" element={<FormCompany />} />
              <Route path="companystatus" element={<CheckStatusCompany />} />
              <Route path="updatecompany/:id" element={<UpdateFormCompany />} />
              <Route path="detailcompany/:id" element={<CheckDetailCompany />} />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Route>
          )}

          {authenticatedUser === "admin" && (
            <Route
              path="/"
              element={
                <React.Fragment>
                  <Header selectedRole="admin" onLogout={handleLogout} />
                  <Menu selectedRole="admin" userData={userData} />
                  <Outlet />
                </React.Fragment>
              }
            >
              <Route index element={<OpenRound />} />
              <Route path="openrounds" element={<OpenRound />} />
              <Route path="managerequests" element={<ManageRequest />} />
              <Route path="addcompany" element={<AddCompany />} />
              <Route
                path="view/:id"
                element={<FormView selectedRole={authenticatedUser} />}
              />
              <Route
                path="viewcompanies/:id"
                element={<CheckDetailCompany/>}
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Route>
          )}
        </Routes>
      )}
    </div>
  );
}

export default App;

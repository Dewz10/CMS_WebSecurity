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

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    // Your authentication logic here
    if (username === "stdtest001" && password === "stdtest001") {
      setAuthenticatedUser("student");
    } else if (username === "comtest001" && password === "comtest001") {
      setAuthenticatedUser("company");
    } else if (username === "admintest001" && password === "admintest001") {
      setAuthenticatedUser("admin");
    } else {
      setAuthenticatedUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticatedUser");
    setAuthenticatedUser(null);
  };

  useEffect(() => {
    // Check if there is no authenticated user in state and localStorage
    if (authenticatedUser === null) {
      const storedUser = localStorage.getItem("authenticatedUser");
  
      if (storedUser===null) {
        // Set the authenticated user from localStorage
        navigate("/login");
      } else {
        setAuthenticatedUser(storedUser);
      }
    }
  }, [authenticatedUser, navigate, setAuthenticatedUser]);
  
  

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} authenticatedUser={authenticatedUser}/>} />

        {authenticatedUser === "student" && (
          <Route
            path="/"
            element={
              <>
                <Header selectedRole={authenticatedUser} onLogout={handleLogout}/>
                <Menu selectedRole={authenticatedUser} />
                <Outlet />
              </>
            }
          >
            <Route path="/news" element={<News />} />
            <Route path="/register" element={<Form />} />
            <Route path="/status" element={<CheckStatus />} />
          </Route>
        )}

        {authenticatedUser === "company" && (
          <Route
            path="/"
            element={
              <>
                <Header selectedRole={authenticatedUser} onLogout={handleLogout}/>
                <Menu selectedRole={authenticatedUser} />
                <Outlet />
              </>
            }
          >
            <Route path="/comregisters" element={<FormCompany />} />
            <Route path="/companystatus" element={<CheckStatusCompany />} />
          </Route>
        )}

        {authenticatedUser === "admin" && (
          <Route
            path="/"
            element={
              <>
                <Header selectedRole={authenticatedUser} onLogout={handleLogout}/>
                <Menu selectedRole={authenticatedUser} />
                <Outlet />
              </>
            }
          >
            <Route path="/openrounds" element={<OpenRound />} />
            <Route path="/managerequests" element={<ManageRequest />} />
            <Route path="/addcompany" element={<AddCompany />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;

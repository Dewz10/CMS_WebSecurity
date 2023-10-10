import React, { useState } from "react";
import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
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

  const handleLogin = (username, password) => {
    // Perform authentication logic here based on username and password.
    // For example, you can use a switch statement or if-else conditions.
    // Set the authenticated user based on the authentication result.
    if (username === "stdtest001" && password === "stdtest001") {
      setAuthenticatedUser("student");
    } else if (username === "comtest001" && password === "comtest001") {
      setAuthenticatedUser("company");
    } else if (username === "admintest001" && password === "admintest001") {
      setAuthenticatedUser("admin");
    } else {
      // Invalid credentials, handle accordingly.
      setAuthenticatedUser(null);
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {authenticatedUser === "student" && (
          <Route
            path="/"
            element={
              <>
                <div>
                  <Header />
                  <Menu />
                  <Outlet />
                </div>
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
                <div>
                  <Header />
                  <Menu />
                  <Outlet />
                </div>
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
                <div>
                  <Header />
                  <Menu />
                  <Outlet />
                </div>
              </>
            }
          >
            <Route path="/openrounds" element={<OpenRound />} />
            <Route path="/managerequests" element={<ManageRequest />} />
            <Route path="/addcompany" element={<AddCompany />} />
          </Route>
        )}

        {authenticatedUser === null && <Navigate to="/login" />}
      </Routes>
    </div>
  );
}

export default App;

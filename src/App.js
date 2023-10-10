import React from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import News from "./views/students/News";
import CheckStatus from "./views/students/CheckStatus";
import Form from "./views/students/Form";
import Login from "./views/login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <div>
              {window.location.pathname !== "/login" && window.location.pathname !== "/" && (
                <>
                  <Header />
                  <Menu />
                </>
              )}
              <Outlet />
            </div>
          }
        >
          {/* เส้นทางหลักเป็น /login */}
          <Route index element={<Login />} />
          <Route path="/news" element={<News />} />
          <Route path="/register" element={<Form />} />
          <Route path="/status" element={<CheckStatus />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

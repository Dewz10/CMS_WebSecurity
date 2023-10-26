import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../src/styles.css";

function Menu({ selectedRole, userData }) {
  const navigate = useNavigate(); // ดึงใช้งาน useNavigate

  const handleReloadAndNavigate = (url) => {
    navigate(url);
  };

  let userName = "";

  if (userData) {
    let username = userData?.data?.username;
    userName = username;
  }

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user-std.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {userName}
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {selectedRole === "user" && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/news"
                    className="nav-link"
                    onClick={() => handleReloadAndNavigate("/news")}
                  >
                    <i className="nav-icon far fa-newspaper" />
                    <p>ข่าวสารนิสิต</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    onClick={() => handleReloadAndNavigate("/register")}
                  >
                    <i className="nav-icon far fa-file" />
                    <p>ฟอร์มคำร้อง</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/status"
                    className="nav-link"
                    onClick={() => handleReloadAndNavigate("/status")}
                  >
                    <i className="nav-icon fas fa-clipboard-check" />
                    <p>ตรวจสอบผล</p>
                  </NavLink>
                </li>
              </>
            )}

            {selectedRole === "company" && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/comregisters"
                    className="nav-link"
                    onClick={() => handleReloadAndNavigate("/comregisters")}
                  >
                    <i className="nav-icon far fa-file" />
                    <p>ลงทะเบียน</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/companystatus"
                    className="nav-link"
                    onClick={() => handleReloadAndNavigate("/companystatus")}
                  >
                    <i className="nav-icon fas fa-clipboard-check" />
                    <p>ตรวจสอบผล</p>
                  </NavLink>
                </li>
              </>
            )}

            {selectedRole === "admin" && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/openrounds"
                    className="nav-link"
                    onClick={() => handleReloadAndNavigate("/openrounds")}
                  >
                    <i className="nav-icon far fa-newspaper" />
                    <p>เปิดรอบ</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/managerequests"
                    className="nav-link"
                    onClick={() => handleReloadAndNavigate("/managerequests")}
                  >
                    <i className="nav-icon far fa-file" />
                    <p>จัดการคำร้อง</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/addcompany"
                    className="nav-link"
                    onClick={() => handleReloadAndNavigate("/addcompany")}
                  >
                    <i className="nav-icon fas fa-clipboard-check" />
                    <p>เพิ่มบริษัท</p>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;

import React from "react";
import { NavLink } from "react-router-dom";
import "../../src/styles.css";


function Menu() {
  const handleReloadAndNavigate = (url) => {
    window.location.reload();
    window.location.href = url; // เปลี่ยนไปยัง URL ที่คุณต้องการหลังจากโหลดใหม่
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
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
              นายใจดี สบายสุข
            </a>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
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
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default Menu;

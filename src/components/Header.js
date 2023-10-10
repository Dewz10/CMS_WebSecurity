import React from "react";

function Header() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
          <p style={{color: 'white'}}>ระบบยื่นคำร้องขอฝึกงาน มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกำแพงแสน</p>
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="fas fa-power-off" />
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a href="/" className="dropdown-item dropdown-footer">
              Log Out
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;

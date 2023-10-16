import React from "react";

function Header({ selectedRole, onLogout }) {
  const handleLogout = () => {
    // ลบ access_token จาก localStorage
    localStorage.removeItem("access_token");
    onLogout();
  };

  const headerText = {
    admin: "ระบบจัดการยื่นคำร้องขอฝึกงาน มหาวิทยาลัยเกษตรศาสตร์",
    company:
      "ระบบยื่นคำร้องสำหรับรับสมัครนิสิตฝึกงาน มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกำแพงแสน",
    user: "ระบบยื่นคำร้องขอฝึกงาน มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกำแพงแสน",
  }[selectedRole];

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
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
            <p style={{ color: "white" }}>{headerText}</p>
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="fas fa-power-off" />
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a
              href="/"
              className="dropdown-item dropdown-footer"
              onClick={handleLogout}
            >
              Log Out
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;

import React from "react";

function CheckStatus() {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6"></div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/news">
                    <span id="homePageTag">หน้าหลัก</span>
                  </a>
                </li>
                <li className="breadcrumb-item active">ตรวจสอบผล</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <div className="content">
        <div class="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">ตรวจสอบผล</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <table
                id="example1"
                className="table table-bordered table-striped"
              >
                <thead>
                  <tr>
                    <th>รอบที่</th>
                    <th>วันที่</th>
                    <th>บริษัท</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td>10-10-2023</td>
                    <td>Agoda</td>
                    <td>
                      <span className="badge bg-success">ผ่านการพิจารณา</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>10-09-2023</td>
                    <td>True Corporation</td>
                    <td>
                      <span className="badge bg-warning">
                        อยู่ระหว่างการพิจารณา
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>10-08-2023</td>
                    <td>NEC CORPORATION</td>
                    <td>
                      <span className="badge bg-danger">ไม่ผ่านการพิจารณา</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* /.card-body */}
          </div>
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content */}
    </div>
  );
}

export default CheckStatus;

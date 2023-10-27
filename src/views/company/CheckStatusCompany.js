import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";


function CheckStatusCompany() {
  const [companyRequest, setCompanyRequest] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/internship/company-request/company", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => setCompanyRequest(Array.from(res.data.data)))
      .catch((err) => console.log(err));
  }, []);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  function showNisit(){

  }
  function handleDelete(){
    Swal.fire({
      title: 'ยืนยันที่จะลบ?',
      text: "หากทำแล้วจะไม่สามารถย้อนกลับมาได้อีก",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ข้อมูลถูกลบเรียบร้อย',
          'คำร้องของคุณถูกลบเรียบร้อย',
          'success'
        )
      }
    })
  }
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
                  <a href="/comregisters">
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
                    <th>รายชื่อนิสิต</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {companyRequest?.map((data, i) => {
                    let cn;
                    let message;
                    if (!data.requestStatus.localeCompare("Pass")) {
                      cn = "badge bg-success";
                      message = "ผ่านการพิจารณา";
                    } else if (!data.requestStatus.localeCompare("Not pass")) {
                      cn = "badge bg-danger";
                      message = "ไม่ผ่านการพิจารณา";
                    } else if (
                      !data.requestStatus.localeCompare("Waiting to consider")
                    ) {
                      cn = "badge bg-warning";
                      message = "อยู่ระหว่างการพิจารณา";
                    }
                    return (
                      <tr key={i}>
                        <td>{data?.applicationRound.name}</td>
                        <td><button className="btn btn-primary">รายชื่อนิสิต</button></td>
                        <td>
                          <span className={cn}>{message}</span>
                        </td>
                        <td>
                          <Link className="text-decoration-none btn btn-sm btn-warning">
                            แก้ไข
                          </Link>
                          <button className="text-decoration-none btn btn-sm btn-danger ml-1" onClick={handleDelete}>
                            ลบ
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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

export default CheckStatusCompany;

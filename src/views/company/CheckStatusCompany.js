import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

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
  function showNisit() {}
  function handleDelete(companyId) {
    Swal.fire({
      title: "ยืนยันที่จะลบ?",
      text: "หากทำแล้วจะไม่สามารถย้อนกลับมาได้อีก",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
    }).then((result) => {
      axios
          .delete("http://localhost:3000/internship/company-request/" + companyId, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            if (result.isConfirmed) {
              Swal.fire(
                "ลบข้อมูลสำเร็จ",
                "ข้อมูลของคุณถูกลบเรียบร้อย",
                "success"
              );
            }
            setTimeout(function () {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            if (result.isConfirmed) {
              Swal.fire("ลบข้อมูลไม่สำเร็จ", "", "error");
            }
          });
    });
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(companyRequest).map((data, i) => {
                    let cn;
                    let message;
                    let isNotWaiting =
                      !data.requestStatus.localeCompare("Pass") ||
                      !data.requestStatus.localeCompare("Not pass");

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
                        <td>{data.applicationRound.name}</td>
                        <td>
                          <table>
                            <thead>
                              <tr>
                                <th>คำนำหน้า</th>
                                <th>ชื่อจริง</th>
                                <th>นามสกุล</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                Array.from(data.collegians).map((data,i)=>{
                                  return(
                                    <tr key={i}>
                                      <td>{data.prefix}</td>
                                      <td>{data.firstName}</td>
                                      <td>{data.lastName}</td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                        </td>
                        <td>
                          <span className={cn}>{message}</span>
                        </td>
                        <td>
                          <Link
                            className={`text-decoration-none btn btn-sm btn-warning ${
                              isNotWaiting ? "disabled" : ""
                            }`}
                            to={"/updateCom/" + data.id}
  
                          >
                            แก้ไข
                          </Link>
                          <button
                            className="text-decoration-none btn btn-sm btn-danger ml-1"
                            onClick={()=>{handleDelete(data.id)}}
                            disabled={isNotWaiting}
                          >
                            ลบ
                          </button>
                          <Link
                            className={`text-decoration-none btn btn-sm btn-primary ml-1`}
                            to={"/detailCom/" + data.id}
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
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

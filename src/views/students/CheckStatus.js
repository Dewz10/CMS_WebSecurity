import React, { useEffect, useState } from "react";
import { getAllRequest } from "../../services/internshipService";

function CheckStatus({ selectedRole }) {
  const [request,setRequest] = useState([])
  useEffect(()=>{
    getAllRequest()
    .then(res => setRequest(res.data))
    .catch(err => console.error(err))
  },[])
  if (selectedRole !== "user") {
    return <p>คุณไม่มีสิทธิ์การเข้าถึงหน้านี้</p>;
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      request?.map((data,i)=>{
                        let cn 
                        let message
                        if(!data.requestStatus.localeCompare("Pass")){
                          cn = "badge bg-success"
                          message = "ผ่านการพิจารณา"
                        }else if(!data.requestStatus.localeCompare("Not pass")){
                          cn = "badge bg-danger"
                          message = "ไม่ผ่านการพิจารณา"
                        }else if(!data.requestStatus.localeCompare("Waiting to consider")){
                          cn = "badge bg-warning"
                          message = "อยู่ระหว่างการพิจารณา"
                        }
                        return (
                          <tr key={i}>
                            <td>{data.applicationRound.name}</td>
                            <td>10-10-2023</td>
                            <td>{data.company.name}</td>
                            <td>
                            <span className={cn}>{message}</span>
                            </td>
                            <td>edit</td>
                          </tr>
                        )
                      })
                    }
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

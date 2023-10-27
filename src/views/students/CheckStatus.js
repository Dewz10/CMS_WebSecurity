import React, { useEffect, useState } from "react";
import { getAllRequest } from "../../services/internshipService";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import './modal.css'
import { Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)'
//   }
// }

function CheckStatus({ selectedRole }) {
  let subtitle
  const [request,setRequest] = useState([])
  useEffect(()=>{
    getAllRequest()
    .then(res => setRequest(res.data))
    .catch(err => console.error(err))
  },[])
  const [modalIsOpen,setIsOpen] = useState(false)
  if (selectedRole !== "user") {
    return <p>คุณไม่มีสิทธิ์การเข้าถึงหน้านี้</p>;
  }
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  function handleClick(id){

    console.log(id)

    Swal.fire({
      title: 'ยืนยันการลบ?',
      text: "ไม่สามารถย้อนมาได้อีก",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
    if(result.isConfirmed){
      axios.delete('http://localhost:3000/internship/request/'+id,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("access_token")
        }
      })
      .then(res => {
        if (result.isConfirmed) {
          Swal.fire(
            'ลบข้อมูลสำเร็จ',
            'ข้อมูลของคุณถูกลบเรียบร้อย',
            'success'
          )
        }
        setTimeout(function() {
          window.location.reload()
        }, 1500);
      })
      .catch(err => {
        if (result.isConfirmed) {
          Swal.fire(
            'ลบข้อมูลไม่สำเร็จ',
            '',
            'error'
            )
          }
      })
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
                            <td>{formatDate(data.requestDate)}</td>
                            <td>{data.company.name}</td>
                            <td>
                            <span className={cn}>{message}</span>
                            </td>
                            <td>
                              <Link className="text-decoration-none btn btn-sm btn-warning" to={'/update/'+data.id}>แก้ไข</Link>
                              <button className="text-decoration-none btn btn-sm btn-danger ml-1" onClick={()=>handleClick(data.id)}>ลบ</button>
                            </td>
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
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>ยืนยันที่จะลบ</h2>
        <div className="btn1">
        <button className="text-decoration-none btn btn-sm btn-danger" onClick={handleDelete}>ยืนยัน</button>
          <button className="text-decoration-none btn btn-sm btn-secondary" onClick={closeModal}>ปิด</button>
        </div>
        
      </Modal> */}
    </div>
  );
}


export default CheckStatus;

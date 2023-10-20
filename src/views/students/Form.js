import React, { useEffect, useState } from "react";
import formpdf from '../../assets/แบบฟอร์มสหกิจศึกษา 2566.pdf'
import { getAllCompany } from "../../services/companyService";
import axios from "axios";


function Form({ selectedRole }) {
  const [company,setCompany] = useState([])
  useEffect(()=>{
    getAllCompany()
    .then(res => setCompany(res.data))
    .catch(err => console.error(err))
  },[])
  const [profile,setProfile] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/auth/profile',{
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('access_token')
      }
    },[])
    .then(res => setProfile(res.data))
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
            <div className="col-sm-6">{/* <h1>ลงทะเบียน</h1> */}</div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/news">
                    <span id="homePageTag">หน้าหลัก</span>
                  </a>
                </li>
                <li className="breadcrumb-item active">ฟอร์มคำร้อง</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">ลงทะเบียน</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                {/* <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                >
                  <i className="fas fa-times" />
                </button> */}
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="std-id">รหัสนิสิต</label>
                      <input
                        type="text"
                        className="form-control"
                        id="std-id"
                        placeholder="รหัสนิสิต"
                        value={profile?.data?.username.slice(1)}
                      />
                    </div>
                    {/* <div classname="form-group" style={{display: 'flex', marginBottom: '0.75rem'}}>
                      <div className="custom-control custom-radio">
                        <input
                          className="custom-control-input"
                          type="radio"
                          id="customRadio1"
                          name="customRadio"
                        />
                        <label
                          htmlFor="customRadio1"
                          className="custom-control-label"
                        >
                          นาย
                        </label>
                      </div>
                      <div style={{paddingRight: 20}}></div>
                      <div className="custom-control custom-radio">
                        <input
                          className="custom-control-input"
                          type="radio"
                          id="customRadio2"
                          name="customRadio"
                        />
                        <label
                          htmlFor="customRadio2"
                          className="custom-control-label"
                        >
                          นางสาว
                        </label>
                      </div>
                    </div> */}
                    <div className="form-group row">
                      <div
                        className="col-4"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 30,
                        }}
                      >
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="customRadio1"
                            name="customRadio"
                          />
                          <label
                            htmlFor="customRadio1"
                            className="custom-control-label"
                          >
                            นาย
                          </label>
                        </div>
                        <div style={{ paddingRight: 35 }}></div>
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="customRadio2"
                            name="customRadio"
                          />
                          <label
                            htmlFor="customRadio2"
                            className="custom-control-label"
                          >
                            นางสาว
                          </label>
                        </div>
                      </div>
                      <div className="col-4">
                        <label htmlFor="firstname">ชื่อ</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="ชื่อ"
                          value={profile?.data?.firstName}
                        />
                      </div>
                      <div className="col-4">
                        <label htmlFor="lastname">นามสกุล</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          placeholder="นามสกุล"
                          value={profile?.data?.lastName}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">เบอร์โทรศัพท์</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="เบอร์โทรศัพท์"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="facebook_name">Facebook</label>
                      <input
                        type="text"
                        className="form-control"
                        id="facebook_name"
                        placeholder="Facebook"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="internship_position">
                        ตำแหน่งที่ไปฝึกงาน/สหกิจศึกษา
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="internship_position"
                        placeholder="ตำแหน่งที่ไปฝึกงาน/สหกิจศึกษา"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        ระบุชื่อของผู้ที่จะให้ภาควิชาฯออกหนังสือ
                        ขอความอนุเคราะห์ฝึกงาน/สหกิจ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="requester_name"
                        placeholder="ระบุชื่อของผู้ที่จะให้ภาควิชาฯออกหนังสือ ขอความอนุเคราะห์ฝึกงาน/สหกิจ"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="requester_position">
                        ระบุตำแหน่งของผู้ที่จะให้ภาควิชาฯ
                        ออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="requester_position"
                        placeholder="ระบุตำแหน่งของผู้ที่จะให้ภาควิชาฯ 
                        ออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="payment_amount">ที่พัก</label>
                      <div style={{ paddingRight: 35 }}></div>
                      <div className="accomodation" style={{ display: "flex" }}>
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="customRadioAccomodation1"
                            name="customRadio"
                          />
                          <label
                            htmlFor="customRadioAccomodation1"
                            className="custom-control-label"
                          >
                            มี
                          </label>
                        </div>
                        <div style={{ paddingRight: 35 }}></div>
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="customRadioAccomodation2"
                            name="customRadio"
                          />
                          <label
                            htmlFor="customRadioAccomodation2"
                            className="custom-control-label"
                          >
                            ไม่มี
                          </label>
                        </div>
                        <div style={{ paddingRight: 35 }}></div>
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="customRadioAccomodation3"
                            name="customRadio"
                          />
                          <label
                            htmlFor="customRadioAccomodation3"
                            className="custom-control-label"
                          >
                            อื่นๆ
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="accomodation"></label>
                        <input
                          type="text"
                          className="form-control"
                          id="accomodation"
                          placeholder="กรณีอื่นๆ"
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>สถานประกอบการ</label>
                      <select
                        className="form-control select2"
                        id="select2-input-company"
                        style={{ width: "100%" }}
                      >
                        {
                          company?.map((data,i)=>{
                            return (<option key={i} value={data.id} name={data.name} id={data.id}>{data.name}</option>)
                          })
                        }
                        {/* <option selected="selected">Agoda</option>
                        <option>True cooperation</option> */}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="coordinator_name">ชื่อผู้ประสานงาน</label>
                      <input
                        type="text"
                        className="form-control"
                        id="coordinator_name"
                        placeholder="ชื่อผู้ประสานงาน"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="coordinator_phone">โทร</label>
                      <input
                        type="text"
                        className="form-control"
                        id="coordinator_phone"
                        placeholder="โทร"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="coordinator_email">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        id="coordinator_email"
                        placeholder="E-mail"
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div class="form-group">
                          <label>ระยะเวลาตั้งแต่</label>
                          <div
                            class="input-group date"
                            id="reservationdate"
                            data-target-input="nearest"
                          >
                            <input
                              type="text"
                              id="start_date"
                              class="form-control datetimepicker-input"
                              data-target="#reservationdate"
                            />
                            <div
                              class="input-group-append"
                              data-target="#reservationdate"
                              data-toggle="datetimepicker"
                            >
                              <div class="input-group-text">
                                <i class="fa fa-calendar"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <label>ถึง</label>
                          <div
                            class="input-group date"
                            id="reservationdate1"
                            data-target-input="nearest"
                          >
                            <input
                              type="text"
                              id="end_date"
                              class="form-control datetimepicker-input"
                              data-target="#reservationdate1"
                            />
                            <div
                              class="input-group-append"
                              data-target="#reservationdate1"
                              data-toggle="datetimepicker"
                            >
                              <div class="input-group-text">
                                <i class="fa fa-calendar"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="payment_amount">
                        จำนวนค่าตอบแทน (บาท/วัน หรือ บาท/เดือน) (หรือ
                        ไม่มีค่าตอบแทน)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="payment_amount"
                        placeholder="จำนวนค่าตอบแทน (บาท/วัน หรือ บาท/เดือน) (หรือ ไม่มีค่าตอบแทน)"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputFile">
                        แนบไฟล์คำร้องขอฝึกงาน/สหกิจศึกษา
                      </label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="exampleInputFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="exampleInputFile"
                          >
                            Choose file
                          </label>
                        </div>
                        <div className="input-group-append">
                          <span className="input-group-text">Upload</span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <a href={formpdf}
                          download="แบบฟอร์มคำร้องขอไปสหกิจ"
                          target="_blank"
                          rel="noreferrer">
                        ดาวน์โหลดไฟล์คำร้อง
                      </a>
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
                <div
                  className="card-footer"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    backgroundColor: "white",
                  }}
                >
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "20%",
                      backgroundColor: "#03a96b",
                      border: "none",
                    }}
                  >
                    ส่งคำร้อง
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
}

export default Form;

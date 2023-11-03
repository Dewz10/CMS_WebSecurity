import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

let user = new Set();
let currentUser = new Set();
let User = [];

function UpdateFormCompany() {
const navigate = useNavigate()
  const [collegians, setCollegians] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/collegians", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => setCollegians(res.data.data))
      .catch((err) => console.error(err));
  }, []);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);
  const [companyRequest, setCompanyRequest] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/internship/company-request/company", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => console.log(res.data.data))
      .catch((err) => console.error(err));
  }, []);
  const [applicationId, setApplicationId] = useState();
  const [rounds, setRounds] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/internship/application", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => setRounds(res.data.data))
      .catch((err) => console.error(err));
  }, []);
  const [round, setRound] = useState();
  useEffect(() => setRound(rounds[rounds.length - 1]));
  const [addUser, setAddUser] = useState([]);
  const [formData, setFormData] = useState({
    requesterName: "",
    requesterPosition: "",
    coordinatorName: "",
    coordinatorPhone: "",
    coordinatorEmail: "",
    startDate: "",
    endDate: "",
    paymentAmount: "",
    accomodation: "",
    applicationRoundId: "",
    userIds: [],
  });

  const handleSubmit = () => {
    console.log(formData);
    axios
      .post("http://localhost:3000/internship/company-request", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log("Form submitted successfully", res.data);
        Swal.fire("ส่งคำร้องสำเร็จ", "", "success");
        setTimeout(function () {}, 1500);
      })
      .catch((err) => {
        console.error("Form submission error", err);
        Swal.fire("ไม่สำเร็จ", "โปรดตรวจสอบข้อมูล", "error");
      });
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      applicationRoundId: round.id,
      [e.target.name]: e.target.value,
    });
  }
  async function addNisit() {
    let option = {};
    for (let i = 0; i < collegians.length; i++) {
      option[collegians[i].id] =
        collegians[i].firstName + " " + collegians[i].lastName;
    }
    const { value: id } = await Swal.fire({
      title: "รายชื่อนิสิต",
      input: "select",
      inputOptions: option,
      inputPlaceholder: "เลือกรายชื่อนิสิต",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          resolve();
        });
      },
    });

    if (id) {
      user.add(parseInt(id));
      const found = collegians.find((element) => element.id === parseInt(id));
      currentUser.add(found);
      //User = Array.from(currentUser);
      console.log(user);
      setAddUser(Array.from(currentUser));
      setFormData({
        ...formData,
        userIds: Array.from(user),
      });

      Swal.fire(`เพิ่มสำเร็จ`, "", "success");
    }
  }
  function handleDelete(id) {
    currentUser.forEach((point) => {
      if (point.id === id) {
        currentUser.delete(point);
      }
    });
    user.delete(id);
    setAddUser(Array.from(currentUser));
    console.log(user);
    setFormData({
      ...formData,
      userIds: Array.from(user),
    });
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
                  <a href="/comregisters">
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
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="form-group">
                      <Form.Label>
                        ระบุชื่อของผู้ที่จะให้ภาควิชาฯออกหนังสือ
                        ขอความอนุเคราะห์ฝึกงาน/สหกิจ
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="requester_name"
                        placeholder="ระบุชื่อของผู้ที่จะให้ภาควิชาฯออกหนังสือ ขอความอนุเคราะห์ฝึกงาน/สหกิจ"
                        name="requesterName"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        ระบุตำแหน่งของผู้ที่จะให้ภาควิชาฯ
                        ออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="requester_position"
                        placeholder="ระบุตำแหน่งของผู้ที่จะให้ภาควิชาฯ 
                        ออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ"
                        name="requesterPosition"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="margin-top-12">
                      <Form.Label>สถานประกอบการ</Form.Label>
                      <Form.Control
                        type="text"
                        id="company_name"
                        placeholder="ชื่อผู้ประสานงาน"
                        value={profile?.data?.firstName}
                      />
                    </Form.Group>
                    <Form.Group className="margin-top-12">
                      <Form.Label>ชื่อผู้ประสานงาน</Form.Label>
                      <Form.Control
                        type="text"
                        id="coordinator_name"
                        placeholder="ชื่อผู้ประสานงาน"
                        name="coordinatorName"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="margin-top-12">
                      <Form.Label>โทร</Form.Label>
                      <Form.Control
                        type="text"
                        id="coordinator_phone"
                        placeholder="โทร"
                        name="coordinatorPhone"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="margin-top-12">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        id="coordinator_email"
                        placeholder="E-mail"
                        name="coordinatorEmail"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  {/* /.col */}
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-6">
                        <Form.Group>
                          <Form.Label>ระยะเวลาตั้งแต่</Form.Label>
                          <Form.Control
                            type="date"
                            name="startDate"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-6">
                        <Form.Group>
                          <Form.Label>ถึงวันที่</Form.Label>
                          <Form.Control
                            type="date"
                            name="endDate"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <Form.Group style={{marginTop: "16px"}}>
                      <Form.Label>
                        จำนวนค่าตอบแทน (บาท/วัน หรือ บาท/เดือน) (หรือ
                        ไม่มีค่าตอบแทน)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="payment_amount"
                        placeholder="จำนวนค่าตอบแทน (บาท/วัน หรือ บาท/เดือน) (หรือ ไม่มีค่าตอบแทน)"
                        name="paymentAmount"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group style={{marginTop: "22px"}}>
                      <Form.Label>ที่พัก</Form.Label>
                      <div className="form-check form-check-inline">
                        <Form.Check
                          type="radio"
                          id="customRadioAccommodation1"
                          label="มี"
                          name="accomodation"
                          value="yes"
                          onChange={handleChange}
                        />
                        <Form.Check
                          type="radio"
                          id="customRadioAccommodation2"
                          label="ไม่มี"
                          name="accomodation"
                          value="no"
                          onChange={handleChange}
                        />
                        <Form.Check
                          type="radio"
                          id="customRadioAccommodation3"
                          label="อื่นๆ"
                          name="accomodation"
                          value="อื่นๆ"
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                    <div className="form-group">
                      <a href="https://www.facebook.com/cpe.eng.kps/?locale=th_TH">
                        ติดต่อสอบถามเพิ่มเติม
                      </a>
                    </div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={addNisit}
                    >
                      เพิ่มรายชื่อนิสิตฝึกงาน
                    </button>
                    <div className="card-body">
                      <table
                        id="myTable"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>คำนำหน้า</th>
                            <th>ชื่อจริง</th>
                            <th>นามสุกล</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {addUser.map((data, i) => {
                            return (
                              <tr key={i}>
                                <td>{data.prefix}</td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="text-decoration-none btn btn-sm btn-danger ml-1"
                                    onClick={() => handleDelete(data.id)}
                                  >
                                    ลบ
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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
                    type="button"
                    className="btn btn-secondary"
                    style={{
                      width: "10%",
                      marginRight: "10px",
                      border: "none",
                    }}
                    onClick={() => navigate(-1)}
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      width: "10%",
                      backgroundColor: "#03a96b",
                      border: "none",
                    }}
                    onClick={handleSubmit}
                  >
                    ส่งคำร้อง
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
}

export default UpdateFormCompany;

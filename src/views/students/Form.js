import React, { useEffect, useState } from "react";
import formpdf from "../../assets/แบบฟอร์มสหกิจศึกษา 2566.pdf";
import { getAllCompany } from "../../services/companyService";
import axios from "axios";
import { Modal, Button, Form, Col, file } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import '../../index.css'
import { getAllRequest } from "../../services/internshipService";
import NotFound from "../pageHandle/NotFound";

function MyForm({ selectedRole }) {
  let navigate = useNavigate()
  const [company, setCompany] = useState([]);
  useEffect(() => {
    getAllCompany()
      .then((res) => setCompany(res.data))
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

  const [stdId, setStdId] = useState(profile?.data?.username.slice(1));
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState(profile?.data?.firstName);
  const [lastName, setLastName] = useState(profile?.data?.lastName);
  const [phone, setPhone] = useState("");
  const [facebookName, setFacebookName] = useState("");
  const [internshipPosition, setInternshipPosition] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [requesterPosition, setRequesterPosition] = useState("");
  const [accommodationValue, setAccommodationValue] = useState("");
  const [selectedCompany, setSelectedCompany] = useState();
  const [coordinatorName, setCoordinatorName] = useState("");
  const [coordinatorPhone, setCoordinatorPhone] = useState("");
  const [coordinatorEmail, setCoordinatorEmail] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paymentAmount, setPaymentAmount] = useState("");
  const [file, setFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rounds,setRounds] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/internship/application',{
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('access_token')
      }
    })
    .then(res => setRounds(res.data.data))
    .catch(err => console.error(err))
  },[])
  const [round,setRound] = useState()
  useEffect(()=>setRound(rounds[rounds.length-1]))
  const [request,setRequest] = useState([])
  useEffect(()=>{
    getAllRequest()
    .then(res => setRequest(res.data))
    .catch(err => console.error(err))
  },[])
  const [canPress,setCanPress] = useState(false)
  request?.map((data,i)=>{
    console.log(data)
  })
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const requestData = {
      requestDate: new Date().toISOString(),
      phone,
      facebookName,
      internshipPosition,
      requesterName,
      requesterPosition,
      coordinatorName,
      coordinatorPhone,
      coordinatorEmail,
      startDate: startDate,
      endDate: endDate,
      paymentAmount,
      accomodation: accommodationValue,
      attachedFile: "test",
      applicationRoundId: round.id,
      companyId: parseInt(selectedCompany)
    };
  
    console.log("Form Data (JSON):", JSON.stringify(requestData));
  
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    };
  
    axios
      .post("http://localhost:3000/internship/request", requestData, { headers })
      .then((res) => {
        console.log("Form submitted successfully", res.data);
        setIsSubmitting(false);
        Swal.fire(
          'ส่งคำร้องสำเร็จ',
          '',
          'success'
        )
        setTimeout(function() {
          window.location.href='/status'
        }, 1500);
      })
      .catch((err) => {
        console.error("Form submission error", err);
        setIsSubmitting(false);
        Swal.fire(
          'ไม่สำเร็จ',
          'โปรดตรวจสอบข้อมูล',
          'error'
        )
      });
  
    setIsSubmitting(true);
  };  

  const handleAccommodationChange = (e) => {
    setAccommodationValue(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  if (selectedRole !== "user") {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return (
    <div className="content-wrapper">
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
      </section>
      <section className="content">
        <div className="container-fluid">
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
              </div>
            </div>
            <div className="card-body">
              <Form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="std-id" className="margin-top-12">
                      <Form.Label>รหัสนิสิต</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="รหัสนิสิต"
                        value={profile?.data?.username.slice(1)}
                        disabled
                      />
                    </Form.Group>
                    {/* <Form.Group className="margin-top-12">
                      <Form.Label>คำนำหน้าชื่อ</Form.Label>
                      <div className="form-check form-check-inline">
                        <Form.Check
                          type="radio"
                          id="customRadio1"
                          label="นาย"
                          name="customRadio"
                        />
                        <Form.Check
                          type="radio"
                          id="customRadio2"
                          label="นางสาว"
                          name="customRadio"
                        />
                      </div>
                    </Form.Group> */}
                    <Form.Group className="margin-top-12">
                      <Form.Label>ชื่อ</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="ชื่อ"
                        value={profile?.data?.firstName}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="margin-top-12">
                      <Form.Label>นามสกุล</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="นามสกุล"
                        value={profile?.data?.lastName}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="margin-top-12" controlId="phone">
                      <Form.Label>เบอร์โทรศัพท์</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="เบอร์โทรศัพท์"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="margin-top-12"
                      controlId="facebook_name"
                    >
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Facebook"
                        onChange={(e) => setFacebookName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="margin-top-12"
                      controlId="internship_position"
                    >
                      <Form.Label>ตำแหน่งที่ไปฝึกงาน/สหกิจศึกษา</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="ตำแหน่งที่ไปฝึกงาน/สหกิจศึกษา"
                        onChange={(e) => setInternshipPosition(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="margin-top-12"
                      controlId="requester_name"
                    >
                      <Form.Label>
                        ระบุชื่อของผู้ที่จะให้ภาควิชาฯออกหนังสือ
                        ขอความอนุเคราะห์ฝึกงาน/สหกิจ
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="ระบุชื่อของผู้ที่จะให้ภาควิชาฯออกหนังสือ ขอความอนุเคราะห์ฝึกงาน/สหกิจ"
                        onChange={(e) => setRequesterName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="margin-top-12"
                      controlId="requester_position"
                    >
                      <Form.Label>
                        ระบุตำแหน่งของผู้ที่จะให้ภาควิชาฯ
                        ออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="ระบุตำแหน่งของผู้ที่จะให้ภาควิชาฯ ออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ"
                        onChange={(e) => setRequesterPosition(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="margin-top-12"
                      controlId="accommodation"
                    >
                      <Form.Label>ที่พัก</Form.Label>
                      <div className="form-check form-check-inline">
                        <Form.Check
                          type="radio"
                          id="customRadioAccommodation1"
                          label="มี"
                          name="customRadioAccommodation"
                          value="มี"
                          checked={accommodationValue === "มี"}
                          onChange={handleAccommodationChange}
                        />
                        <Form.Check
                          type="radio"
                          id="customRadioAccommodation2"
                          label="ไม่มี"
                          name="customRadioAccommodation"
                          value="ไม่มี"
                          checked={accommodationValue === "ไม่มี"}
                          onChange={handleAccommodationChange}
                        />
                        <Form.Check
                          type="radio"
                          id="customRadioAccommodation3"
                          label="อื่นๆ"
                          name="customRadioAccommodation"
                          value="อื่นๆ"
                          checked={accommodationValue === "อื่นๆ"}
                          onChange={handleAccommodationChange}
                        />
                      </div>
                    </Form.Group>
                    {accommodationValue === "อื่นๆ" && (
                      <Form.Group
                        className="margin-top-12"
                        controlId="other_accommodation"
                      >
                        <Form.Label>กรณีอื่นๆ</Form.Label>
                        <Form.Control type="text" placeholder="กรณีอื่นๆ" onChange={(e) => setAccommodationValue(e.target.value)}/>
                      </Form.Group>
                    )}
                  </div>
                  <div className="col-md-6">
                    <Form.Group
                      className="margin-top-12"
                      controlId="select2-input-company"
                    >
                      <Form.Label>สถานประกอบการ</Form.Label>
                      <Form.Control
                        as="select"
                        style={{ width: "100%" }}
                        class="form-select"
                        onChange={(e) => setSelectedCompany(e.target.value)}
                      >
                        <option value="hide">-- สถานประกอบการ --</option>
                        {company.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group
                      className="margin-top-12"
                      controlId="coordinator_name"
                    >
                      <Form.Label>ชื่อผู้ประสานงาน</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="ชื่อผู้ประสานงาน"
                        onChange={(e) => setCoordinatorName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="margin-top-12"
                      controlId="coordinator_phone"
                    >
                      <Form.Label>โทร</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="โทร"
                        onChange={(e) => setCoordinatorPhone(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="margin-top-12"
                      controlId="coordinator_email"
                    >
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="E-mail"
                        onChange={(e) => setCoordinatorEmail(e.target.value)}
                      />
                    </Form.Group>
                    <div className="row">
                      <div className="col-6">
                        <Form.Group
                          className="margin-top-12"
                          controlId="start_date"
                        >
                          <Form.Label>ระยะเวลาตั้งแต่</Form.Label>
                          <Form.Control
                            type="date"
                            selected={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-6">
                        <Form.Group
                          className="margin-top-12"
                          controlId="start_date"
                        >
                          <Form.Label>ถึงวันที่</Form.Label>
                          <Form.Control
                            type="date"
                            selected={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <Form.Group
                      className="margin-top-12"
                      controlId="payment_amount"
                    >
                      <Form.Label>
                        จำนวนค่าตอบแทน (บาท/วัน หรือ บาท/เดือน) (หรือ
                        ไม่มีค่าตอบแทน)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="จำนวนค่าตอบแทน (บาท/วัน หรือ บาท/เดือน) (หรือ ไม่มีค่าตอบแทน)"
                        onChange={(e) => setPaymentAmount(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="margin-top-12"
                      controlId="formFile"
                    >
                      <Form.Label>แนบไฟล์คำร้องขอฝึกงาน/สหกิจศึกษา</Form.Label>
                      <input type="file" className="form-control h-100"/>
                    </Form.Group>
                    <Form.Group className="margin-top-12">
                      <a
                        href={formpdf}
                        download="แบบฟอร์มคำร้องขอไปสหกิจ"
                        target="_blank"
                        rel="noreferrer"
                      >
                        ดาวน์โหลดไฟล์คำร้อง
                      </a>
                    </Form.Group>
                  </div>
                </div>
                <div
                  className="card-footer"
                  style={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "end",
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
                    disabled={isSubmitting} // Disable the button while submitting
                  >
                    {isSubmitting ? "กำลังส่งคำร้อง..." : "ส่งคำร้อง"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyForm;

import React, { useEffect, useState } from "react";
import formpdf from "../../assets/แบบฟอร์มสหกิจศึกษา 2566.pdf";
import { getAllCompany } from "../../services/companyService";
import axios from "axios";
import { Modal, Button, Form, Col, file } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import "../../index.css";

const CheckDetail = ( {selectedRole}) => {
    let navigate = useNavigate();
    const { id } = useParams();
    //let history = useHistory();
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
    //console.log(request?.data?.phone)
  
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
  
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
  
      return [year, month, day].join("-");
    }
    const [attFile,setAttFile] = useState()
  
    const [formData, setFormData] = useState({
      requestDate: "",
      phone: "",
      facebookName: "",
      internshipPosition: "",
      requesterName: "",
      requesterPosition: "",
      coordinatorName: "",
      coordinatorPhone: "",
      coordinatorEmail: "",
      startDate: "",
      endDate: "",
      paymentAmount: "",
      accomodation: "",
      companyId: 0,
    });
    useEffect(() => {
      axios
        .get("http://localhost:3000/internship/request/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          setFormData({
            ...formData,
            requestDate: res.data?.data.requestDate,
            phone: res.data?.data.phone,
            facebookName: res.data?.data.facebookName,
            internshipPosition: res.data?.data.internshipPosition,
            requesterName: res.data?.data.requesterName,
            requesterPosition: res.data?.data.requesterPosition,
            coordinatorName: res.data?.data.coordinatorName,
            coordinatorPhone: res.data?.data.coordinatorPhone,
            coordinatorEmail: res.data?.data.coordinatorEmail,
            startDate: formatDate(res.data?.data.startDate),
            endDate: formatDate(res.data?.data.endDate),
            paymentAmount: res.data?.data.paymentAmount,
            accomodation: res.data?.data.accomodation,
            companyId: res.data?.data.company?.id,
          });
          setAttFile(res.data.data.file)
        })
        .catch((err) => console.error(err));
    }, []);
    //console.log(formData);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
  
  
    const handleFileChange = (e) => {
      const attachedFile = e.target.files[0];
      setFormData({
        ...formData,
        file: attachedFile,
      });
      //console.log(atob(formData.file.data));
    };
  
    if (selectedRole !== "user") {
      return <p>คุณไม่มีสิทธิ์การเข้าถึงหน้านี้</p>;
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
                <h3 className="card-title">แก้ไข</h3>
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
                <Form>
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
                          name="phone"
                          placeholder="เบอร์โทรศัพท์"
                          defaultValue={formData.phone}
                          disabled
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
                          name="facebookName"
                          defaultValue={formData.facebookName}
                          disabled
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
                          defaultValue={formData.internshipPosition}
                          name="internshipPosition"
                          disabled
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
                          defaultValue={formData.requesterName}
                          name="requesterName"
                          disabled
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
                          defaultValue={formData.requesterPosition}
                          name="requesterPosition"
                          disabled
                        />
                      </Form.Group>
                      <Form.Group
                        className="margin-top-12"
                        controlId="accommodation"
                        defaultChecked={formData.accomodation}
                      >
                        <Form.Label>ที่พัก</Form.Label>
                        <div className="form-check form-check-inline">
                          <Form.Check
                            type="radio"
                            id="customRadioAccommodation1"
                            label="มี"
                            name="accomodation"
                            value="yes"
                            checked={formData.accomodation === "yes"}
                            disabled
                          />
                          <Form.Check
                            type="radio"
                            id="customRadioAccommodation2"
                            label="ไม่มี"
                            name="accomodation"
                            value="no"
                            checked={formData.accomodation === "no"}
                            disabled
                          />
                          <Form.Check
                            type="radio"
                            id="customRadioAccommodation3"
                            label="อื่นๆ"
                            name="accomodation"
                            value="อื่นๆ"
                            checked={formData.accomodation === "อื่นๆ"}
                            disabled
                          />
                        </div>
                      </Form.Group>
                      {formData.accomodation === "อื่นๆ" && (
                        <Form.Group
                          className="margin-top-12"
                          controlId="other_accommodation"
                        >
                          <Form.Label>กรณีอื่นๆ</Form.Label>
                          <Form.Control type="text" placeholder="กรณีอื่นๆ" />
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
                          name="companyId"
                          value={formData.companyId}
                          disabled
                        >
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
                          name="coordinatorName"
                          defaultValue={formData.coordinatorName}
                          disabled
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
                          name="coordinatorPhone"
                          defaultValue={formData.coordinatorPhone}
                          disabled
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
                          name="coordinatorEmail"
                          defaultValue={formData.coordinatorEmail}
                          disabled
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
                              defaultValue={formData.startDate}
                              name="startDate"
                              disabled
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
                              defaultValue={formData.endDate}
                              name="endDate"
                              disabled
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
                          name="paymentAmount"
                          defaultValue={formData.paymentAmount}
                          disabled
                        />
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
                      type="button"
                      className="btn btn-secondary ml-1"
                      style={{
                        width: "10%",
                        border: "none",
                      }}
                      onClick={() => navigate(-1)}
                    >
                      ย้อนกลับ
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">เอกสาร</h3>
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
                <embed src={`data:application/pdf;base64,${attFile?.data}`} width="100%" height="750px"/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default CheckDetail
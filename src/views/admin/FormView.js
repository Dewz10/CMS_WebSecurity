import React, { useEffect, useState } from "react";
import formpdf from "../../assets/แบบฟอร์มสหกิจศึกษา 2566.pdf";
import { getAllCompany } from "../../services/companyService";
import axios from "axios";
import { Modal, Button, Form, Col, file } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import "../../index.css";

const FormView = ({ selectedRole }) => {
  let navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [company, setCompany] = useState([]);
  useEffect(() => {
    getAllCompany()
      .then((res) => setCompany(res.data))
      .catch((err) => console.error(err));
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

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
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
    file: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/internship/request/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        // console.log(res.data.data.file);
        setFormData({
          ...formData,
          username: res.data?.data.user.username,
          firstName: res.data?.data.user.firstName,
          lastName: res.data?.data.user.lastName,
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
          file: res.data.data.file,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "ยืนยันการแก้ไข",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#03a96b",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch("http://localhost:3000/internship/request/" + id, formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            if (result.isConfirmed) {
              Swal.fire(
                "แก้ไขข้อมูลสำเร็จ",
                "ข้อมูลของคุณถูกแก้ไขเรียบร้อย",
                "success"
              );
            }
            setTimeout(function () {
              window.location.href = "/status";
            }, 1500);
          })
          .catch((err) => {
            if (result.isConfirmed) {
              Swal.fire(
                "แก้ไขข้อมูลไม่สำเร็จ",
                "โปรดตรวจสอบข้อมูลอีกครั้ง",
                "error"
              );
            }
          });
      }
    });

    setIsSubmitting(true);
  };
  const handleChange = (e) => {
    if (e.target.name === "companyId") {
      // Update formData if the condition is true
      setFormData({
        ...formData,
        [e.target.name]: parseInt(e.target.value),
      });
    } else if (e.target.name === "startDate" || e.target.name === "endDate") {
      let date = new Date(e.target.value);
      setFormData({
        ...formData,
        [e.target.name]: date,
      });
    } else {
      // Update formData differently if the condition is false
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        // Update other properties as needed
      });
    }
  };


  if (selectedRole !== "admin") {
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
              <h3 className="card-title">รายละเอียด</h3>
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
                        value={formData.username.slice(1)}
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
                        value={formData.firstName}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="margin-top-12">
                      <Form.Label>นามสกุล</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="นามสกุล"
                        value={formData.lastName}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                          onChange={handleChange}
                          disabled
                        />
                        <Form.Check
                          type="radio"
                          id="customRadioAccommodation2"
                          label="ไม่มี"
                          name="accomodation"
                          value="no"
                          checked={formData.accomodation === "no"}
                          onChange={handleChange}
                          disabled
                        />
                        <Form.Check
                          type="radio"
                          id="customRadioAccommodation3"
                          label="อื่นๆ"
                          name="accomodation"
                          value="อื่นๆ"
                          checked={formData.accomodation === "อื่นๆ"}
                          onChange={handleChange}
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
                        <Form.Control type="text" placeholder="กรณีอื่นๆ" disabled/>
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                    {/* <Form.Group
                      className="margin-top-12"
                      controlId="exampleInputFile"
                    >
                      <Form.Label>แนบไฟล์คำร้องขอฝึกงาน/สหกิจศึกษา</Form.Label>
                      <div className="input-group">
                        <input type="file" className="form-control h-100" />
                      </div>
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
                    </Form.Group> */}
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
              <embed src={`data:application/pdf;base64,${formData.file.data}`} width="100%" height="750px"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormView;

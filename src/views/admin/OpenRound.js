import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { format, parseISO } from "date-fns";

function OpenRound() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [idEdit, setIdEdit] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    openingDate: "",
    closingDate: "",
    internshipType: "internship",
    considerationDate: "",
    applicationStatus: "Open",
  });

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Opening Date",
      selector: "openingDate",
      sortable: true,
      cell: (row) => {
        const date = new Date(row.openingDate);
        return date.toLocaleDateString("th-TH");
      },
    },
    {
      name: "Closing Date",
      selector: "closingDate",
      sortable: true,
      cell: (row) => {
        const date = new Date(row.closingDate);
        return date.toLocaleDateString("th-TH");
      },
    },
    {
      name: "Internship Type",
      selector: (row) => row.internshipType,
      sortable: true,
    },
    {
      name: "Consideration Date",
      selector: "considerationDate",
      sortable: true,
      cell: (row) => {
        const date = new Date(row.considerationDate);
        return date.toLocaleDateString("th-TH");
      },
    },
    {
      name: "Application Status",
      selector: "applicationStatus",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button variant="info" onClick={() => handleEdit(row)}>
            แก้ไข
          </Button>{' '}
          <Button variant="danger" onClick={() => handleDelete(row)}>
            ลบ
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/internship/application", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  }, []);

  useEffect(() => {
    setRounds(data);
  }, [data]);

  const handleSaveData = () => {
    setShowModal(false);

    if (editMode) {
      console.log(idEdit)
      axios
        .patch(
          `http://localhost:3000/internship/application/`+idEdit,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
          Swal.fire("บันทึกสำเร็จ!", "ข้อมูลถูกบันทึกเรียบร้อยแล้ว", "success");
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          Swal.fire("ข้อผิดพลาด!", "ไม่สามารถบันทึกข้อมูลได้", "error");
          console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
        });
    } else {
      axios
        .post("http://localhost:3000/internship/application", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          Swal.fire("บันทึกสำเร็จ!", "ข้อมูลถูกบันทึกเรียบร้อยแล้ว", "success");
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          Swal.fire("ข้อผิดพลาด!", "ไม่สามารถบันทึกข้อมูลได้", "error");
          console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
        });
    }
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const handleEdit = (row) => {
    setEditMode(true);
    setIdEdit(row.id);
    setFormData({
      name: row.name,
      openingDate: formatDate(row.openingDate),
      closingDate: formatDate(row.closingDate),
      internshipType: row.internshipType,
      considerationDate: formatDate(row.considerationDate),
      applicationStatus: row.applicationStatus,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditMode(false);
    setShowModal(true);
    setFormData({
      name: "",
      openingDate: "",
      closingDate: "",
      internshipType: "internship",
      considerationDate: "",
      applicationStatus: "Open",
    });
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "คุณแน่ใจหรือ?",
      text: "คุณต้องการลบรายการนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบ!",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/internship/application/${row.id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((response) => {
            Swal.fire("ลบแล้ว!", "รายการถูกลบเรียบร้อย", "success");
            setTimeout(function () {
              window.location.reload();
            }, 1500);
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการลบรายการ:", error);
            Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบรายการได้", "error");
          });
      }
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                  <a href="/openrounds">
                    <span id="homePageTag">หน้าหลัก</span>
                  </a>
                </li>
                <li className="breadcrumb-item active">เปิดรอบ</li>
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
          <div className="card">
            <div
              className="card-header"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <Button variant="primary" onClick={() => handleAdd()}>
                เพิ่มรอบ
              </Button>
            </div>
            <div className="card-body">
              <DataTable
                title="รายการเปิดรอบ"
                pagination
                columns={columns}
                data={rounds}
              />
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    {editMode ? "แก้ไขรอบ" : "เพิ่มรอบ"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      as={Col}
                      controlId="formGridName"
                      className="margin-top-12"
                    >
                      <Form.Label>ชื่อ</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridOpeningDate"
                      className="margin-top-12"
                    >
                      <Form.Label>วันเริ่มต้น</Form.Label>
                      <Form.Control
                        type="date"
                        name="openingDate"
                        value={formData.openingDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridClosingDate"
                      className="margin-top-12"
                    >
                      <Form.Label>วันสิ้นสุด</Form.Label>
                      <Form.Control
                        type="date"
                        name="closingDate"
                        value={formData.closingDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridInternshipType"
                      className="margin-top-12"
                    >
                      <Form.Label>ประเภทการฝึกงาน</Form.Label>
                      <Form.Control
                        as="select"
                        name="internshipType"
                        value={formData.internshipType}
                        onChange={handleChange}
                      >
                        <option value="internship">Internship</option>
                        <option value="Cooperative">Cooperative</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridConsiderationDate"
                      className="margin-top-12"
                    >
                      <Form.Label>วันที่พิจารณา</Form.Label>
                      <Form.Control
                        type="date"
                        name="considerationDate"
                        value={formData.considerationDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridApplicationStatus"
                      className="margin-top-12"
                    >
                      <Form.Label>สถานะการสมัคร</Form.Label>
                      <Form.Control
                        as="select"
                        name="applicationStatus"
                        value={formData.applicationStatus}
                        onChange={handleChange}
                      >
                        <option value="Open">Open</option>
                        <option value="Considering">Considering</option>
                        <option value="Close">Close</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    ปิด
                  </Button>
                  <Button variant="primary" onClick={handleSaveData}>
                    {editMode ? "บันทึกการแก้ไข" : "บันทึกการเพิ่มรอบ"}
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
}

export default OpenRound;

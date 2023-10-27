import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";

function AddCompany() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState([]); // Update the state to companies
  const [idEdit, setIdEdit] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    locationNumber: "",
    road: "",
    subdistrict: "",
    district: "",
    province: "",
    postCode: ""
  });

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Location Number",
      selector: (row) => row.locationNumber,
      sortable: true
    },
    {
      name: "Road",
      selector: (row) => row.road,
      sortable: true
    },
    {
      name: "Subdistrict",
      selector: (row) => row.subdistrict,
      sortable: true
    },
    {
      name: "District",
      selector: (row) => row.district,
      sortable: true
    },
    {
      name: "Province",
      selector: (row) => row.province,
      sortable: true
    },
    {
      name: "Post Code",
      selector: (row) => row.postCode,
      sortable: true
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button variant="info" onClick={() => handleEdit(row)}>
            แก้ไข
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row)}>
            ลบ
          </Button>
        </div>
      )
    }
  ];
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/internship/company", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  }, []);

  useEffect(() => {
    setCompanies(data);
  }, [data]);

  const handleSaveData = () => {
    setShowModal(false);

    if (editMode) {
      axios
        .patch(
          `http://localhost:3000/internship/company/` + idEdit,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token")
            }
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
        .post("http://localhost:3000/internship/company", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
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

  const handleEdit = (row) => {
    setEditMode(true);
    setIdEdit(row.id);
    setFormData({
      name: row.name,
      locationNumber: row.locationNumber,
      road: row.road,
      subdistrict: row.subdistrict,
      district: row.district,
      province: row.province,
      postCode: row.postCode
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditMode(false);
    setShowModal(true);
    setFormData({
      name: "",
      locationNumber: "",
      road: "",
      subdistrict: "",
      district: "",
      province: "",
      postCode: ""
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
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/internship/company/` + row.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token")
            }
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
      [e.target.name]: e.target.value
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
                <li className="breadcrumb-item active">เพิ่มบริษัท</li>
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
                เพิ่มบริษัท
              </Button>
            </div>
            <div className="card-body">
              <DataTable
                title="รายการบริษัท"
                pagination
                columns={columns}
                data={companies}
              />
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    {editMode ? "แก้ไขบริษัท" : "เพิ่มบริษัท"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      as={Col}
                      controlId="formGridName"
                      className="margin-top-12"
                    >
                      <Form.Label>ชื่อบริษัท</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridLocationNumber"
                      className="margin-top-12"
                    >
                      <Form.Label>เลขที่</Form.Label>
                      <Form.Control
                        type="text"
                        name="locationNumber"
                        value={formData.locationNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridRoad"
                      className="margin-top-12"
                    >
                      <Form.Label>ถนน</Form.Label>
                      <Form.Control
                        type="text"
                        name="road"
                        value={formData.road}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridSubdistrict"
                      className="margin-top-12"
                    >
                      <Form.Label>แขวง/ตำบล</Form.Label>
                      <Form.Control
                        type="text"
                        name="subdistrict"
                        value={formData.subdistrict}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridDistrict"
                      className="margin-top-12"
                    >
                      <Form.Label>เขต/อำเภอ</Form.Label>
                      <Form.Control
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridProvince"
                      className="margin-top-12"
                    >
                      <Form.Label>จังหวัด</Form.Label>
                      <Form.Control
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridPostCode"
                      className="margin-top-12"
                    >
                      <Form.Label>รหัสไปรษณีย์</Form.Label>
                      <Form.Control
                        type="text"
                        name="postCode"
                        value={formData.postCode}
                        onChange={handleChange}
                      />
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
                    {editMode ? "บันทึกการแก้ไข" : "บันทึกการเพิ่มบริษัท"}
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

export default AddCompany;

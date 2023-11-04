import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function ManageRequest() {
  const [data, setData] = useState([]);
  const [dataCompany, setDataCompany] = useState([]);
  const [requestStatus, setRequestStatus] = useState("");
  const [requestId, setRequestId] = useState(0);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(0);

  const columns = [
    {
      name: "Company",
      selector: (row) => row.company.name,
      sortable: true,
    },
    {
      name: "ID",
      selector: (row) => row.user.username,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.user.firstName + " " + row.user.lastName,
      sortable: true,
    },
    {
      name: "Request Date",
      selector: (row) => row.requestDate,
      sortable: true,
      cell: (row) => {
        const date = new Date(row.requestDate);
        return date.toLocaleDateString("th-TH");
      },
    },
    {
      name: "Internship Position",
      selector: (row) => row.internshipPosition,
      sortable: true,
    },
    {
      name: "Request Status",
      selector: (row) => row.requestStatus,
      sortable: true,
      cell: (row) => {
        let badgeClass = "";
  
        switch (row.requestStatus) {
          case "Pass":
            badgeClass = "badge bg-success";
            break;
          case "Not pass":
            badgeClass = "badge bg-danger";
            break;
          case "Waiting to consider":
            badgeClass = "badge bg-warning";
            break;
          default:
            badgeClass = "badge bg-secondary";
            break;
        }
  
        return (
          <span className={`badge ${badgeClass}`} style={{fontSize: "14px"}}>{row.requestStatus}</span>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.requestStatus === "Waiting to consider" && (
            <Button variant="success" onClick={() => handleAccept(row)}>
              <i className="fas fa-check"></i>
            </Button>
          )}{" "}
          {row.requestStatus === "Waiting to consider" && (
            <Button variant="danger" onClick={() => handleReject(row)}>
              <i className="fas fa-times"></i>
            </Button>
          )}{" "}
          <Link
            className="text-decoration-none btn btn-primary"
            to={"/view/" + row.id}
          >
            <i className="fas fa-eye"></i>
          </Link>
        </div>
      ),
    },
  ];

  const columnCompany = [
    {
      name: "Company",
      selector: (row) => row.user.firstName,
      sortable: true,
      minWidth: "150px",
    },
    // {
    //   name: "Requester Name",
    //   selector: (row) => row.requesterName,
    //   sortable: true,
    //   minWidth: "150px",
    // },
    // {
    //   name: "Position",
    //   selector: (row) => row.requesterPosition,
    //   sortable: true,
    //   minWidth: "150px",
    // },
    {
      name: "Coordinator Name",
      selector: (row) => row.coordinatorName,
      sortable: true,
      minWidth: "120px",
    },
    {
      name: "Phone",
      selector: (row) => row.coordinatorPhone,
      sortable: true,
      minWidth: "50px",
    },
    {
      name: "Email",
      selector: (row) => row.coordinatorEmail,
      sortable: true,
      minWidth: "150px",
    },
    // {
    //   name: "Start Date",
    //   selector: (row) => {
    //     const date = new Date(row.startDate);
    //     return date.toLocaleDateString("th-TH");
    //   },
    //   sortable: true,
    //   minWidth: "150px",
    // },
    // {
    //   name: "End Date",
    //   selector: (row) => {
    //     const date = new Date(row.endDate);
    //     return date.toLocaleDateString("th-TH");
    //   },
    //   sortable: true,
    //   minWidth: "150px",
    // },
    {
      name: "Application Round",
      selector: (row) => row.applicationRound.name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Request Status",
      selector: (row) => row.requestStatus,
      sortable: true,
      cell: (row) => {
        let badgeClass = "";
  
        switch (row.requestStatus) {
          case "Pass":
            badgeClass = "badge bg-success";
            break;
          case "Not pass":
            badgeClass = "badge bg-danger";
            break;
          case "Waiting to consider":
            badgeClass = "badge bg-warning";
            break;
          default:
            badgeClass = "badge bg-secondary";
            break;
        }
  
        return (
          <span className={`badge ${badgeClass}`} style={{fontSize: "14px"}}>{row.requestStatus}</span>
        );
      },
    },
    {
      name: "Actions",
      minWidth: "190px",
      cell: (row) => (
        <div>
          {row.requestStatus === "Waiting to consider" && (
            <Button variant="success" onClick={() => handleAcceptCompany(row)}>
              <i className="fas fa-check"></i>
            </Button>
          )}{" "}
          {row.requestStatus === "Waiting to consider" && (
            <Button variant="danger" onClick={() => handleRejectCompany(row)}>
              <i className="fas fa-times"></i>
            </Button>
          )}{" "}
          <Link
            className="text-decoration-none btn btn-primary"
            to={"/viewcompanies/" + row.id}
          >
            <i className="fas fa-eye"></i>
          </Link>
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
        setApplications(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching application data:", error);
      });
  }, []);

  useEffect(() => {
    fetchData(selectedApplication);
  }, [selectedApplication]);

  const fetchData = (selectedAppId) => {
    console.log(selectedAppId);
    let url;
    let urlCompany;
  
    if (selectedAppId === 0) {
      url = "http://localhost:3000/internship/request";
      urlCompany = "http://localhost:3000/internship/company-request";
    } else {
      url = `http://localhost:3000/internship/request/application-round/${selectedAppId}`;
      urlCompany = `http://localhost:3000/internship/company-request/${selectedAppId}`;
    }
  
    const axiosConfig = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
  
    axios
      .get(url, axiosConfig)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    axios
      .get(urlCompany, axiosConfig)
      .then((response) => {
        setDataCompany(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  

  const handleApplicationChange = (e) => {
    setSelectedApplication(e.target.value);
  };

  const handleAccept = (row) => {
    updateRequestStatus(row.id, "Pass");
  };

  const handleReject = (row) => {
    updateRequestStatus(row.id, "Not pass");
  };

  const handleAcceptCompany = (row) => {
    updateRequestStatusCompany(row.id, "Pass");
  };

  const handleRejectCompany = (row) => {
    updateRequestStatusCompany(row.id, "Not pass");
  };

  const handleReload = () => {
    window.location.reload();
  }

  const updateRequestStatus = (requestId, status) => {
    const requestData = {
      requestStatus: status,
    };

    Swal.fire({
      title: "ยืนยันการดำเนินการ",
      text: `คุณต้องการปรับเปลี่ยนสถานะเป็น "${status}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `http://localhost:3000/internship/request/${requestId}`,
            requestData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((response) => {
            Swal.fire("สำเร็จ!", "ปรับเปลี่ยนสถานะสำเร็จ", "success").then(
              () => {
                fetchData(selectedApplication);
              }
            );
          })
          .catch((error) => {
            Swal.fire("ข้อผิดพลาด!", "ไม่สามารถปรับเปลี่ยนสถานะ", "error");
            console.error("Error updating request status:", error);
          });
      }
    });
  };

  const updateRequestStatusCompany = (requestId, status) => {
    const requestData = {
      requestStatus: status,
    };

    Swal.fire({
      title: "ยืนยันการดำเนินการ",
      text: `คุณต้องการปรับเปลี่ยนสถานะเป็น "${status}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `http://localhost:3000/internship/company-request/${requestId}`,
            requestData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((response) => {
            Swal.fire("สำเร็จ!", "ปรับเปลี่ยนสถานะสำเร็จ", "success").then(
              () => {
                fetchData(selectedApplication);
              }
            );
          })
          .catch((error) => {
            Swal.fire("ข้อผิดพลาด!", "ไม่สามารถปรับเปลี่ยนสถานะ", "error");
            console.error("Error updating request status:", error);
          });
      }
    });
  };

  const applicationOptions = applications.map((app) => (
    <option key={app.id} value={app.id}>
      {app.name}
    </option>
  ));

  return (
    <div className="content-wrapper">
      <section className="content-header">
        {/* ... Your existing code for the header */}
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card">
          <div className="card-header">
              <h3 className="card-title">เลือกรอบ</h3>
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
            <Form.Group>
            <Form.Control
              as="select"
              value={selectedApplication}
              onChange={handleApplicationChange}
            >
              <option value={0}>ทั้งหมด</option>
              {applicationOptions}
            </Form.Control>
          </Form.Group>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card">
          <div className="card-header">
              <h3 className="card-title">จัดการคำร้องนิสิต</h3>
              <div className="card-tools">
              <button
                  type="button"
                  className="btn btn-tool"
                  onClick={handleReload}
                >
                  <i className="fa fa-refresh" />
                </button>
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
              <DataTable
                // title="จัดการคำร้องนิสิต"
                pagination
                columns={columns}
                data={data}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card">
          <div className="card-header">
              <h3 className="card-title">จัดการคำร้องบริษัท</h3>
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
              <DataTable
                // title="จัดการคำร้องบริษัท"
                pagination
                columns={columnCompany}
                data={dataCompany}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageRequest;

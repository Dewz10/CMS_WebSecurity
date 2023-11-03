import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function ManageRequest() {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState("");
  const [requestId, setRequestId] = useState(0);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(0);

  const columns = [
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Request Date",
      selector: (row) => row.requestDate,
      sortable: true,
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
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.requestStatus === "Waiting to consider" && (
            <Button variant="success" onClick={() => handleAccept(row)}>
              Accept
            </Button>
          )}
          {row.requestStatus === "Waiting to consider" && (
            <Button variant="danger" onClick={() => handleReject(row)}>
              Reject
            </Button>
          )}
          <Link
            className="text-decoration-none btn btn-primary"
            to={"/view/" + row.id}
          >
            แก้ไข
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

    if (selectedAppId === 0) {
      url = "http://localhost:3000/internship/request";
    } else {
      url = `http://localhost:3000/internship/request/application-round/${selectedAppId}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setData(response.data.data);
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
          <Form.Group>
            <Form.Label>ค้นหา</Form.Label>
            <Form.Control
              as="select"
              value={selectedApplication}
              onChange={handleApplicationChange}
            >
              <option value={0}>ทั้งหมด</option>
              {applicationOptions}
            </Form.Control>
          </Form.Group>
          <div className="card">
            <div className="card-body">
              <DataTable
                title="จัดการคำร้อง"
                pagination
                columns={columns}
                data={data}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageRequest;

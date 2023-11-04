import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "react-countdown";
import Count from "../../components/Count";

function News() {
  const [rounds, setRounds] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:3000/internship/application", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => setRounds(res.data.data))
      .catch((err) => console.error(err));
  }, []);
  const [round, setRound] = useState();
  useEffect(() => setRound(rounds[rounds.length - 1]));
  console.log(round?.applicationStatus);
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h4 className="m-0">
                <span id="homePageTagHeader">
                  <b>ยินดีต้อนรับเข้าสู่ระบบยื่นคำร้องฝึกงาน/สหกิจศึกษา</b>
                </span>
              </h4>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/news">
                    <span id="homePageTag">หน้าหลัก</span>
                  </a>
                </li>
                <li className="breadcrumb-item active">ข่าวสารนิสิต</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <hr class="d-block container-m-nx mt-0 mb-4"></hr>
      <div>
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1">
            <div className="mb-3 mt-2" style={{ display: "flex" }}>
              <button type="button" className="btn-ann btn btn-info">
                ประกาศรอบการยื่นคำร้องขอฝึกงาน/สหกิจศึกษา
              </button>
            </div>
            <div className="mb-3 card">
              <h4
                className="ann-border-Header card-header"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="d-flex flex-row align-items-center">
                  <div className="icon-title"></div>
                  <div>
                    <Count deadline={round?.considerationDate} />
                  </div>
                </div>
              </h4>
              <div className="cursor card-body" style={{ padding: 8 }}>
                <div>
                  <div
                    className="content"
                    style={{ backgroundColor: "#f5faf4" }}
                  >
                    <CheckStatus
                      status={round?.applicationStatus}
                      round={round}
                    />
                    <FormatDate considerationDate={round?.considerationDate} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function FormatDate(props) {
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  let d = props.considerationDate;
  const date = new Date(d);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "25px",
        fontWeight: "bold",
        marginTop: "15px",
      }}
    >
      วันที่พิจารณา {day} {month} {year}
    </div>
  );
}

function CheckStatus(props) {
  const status = props.status;
  const round = props.round;
  if (status === "Open") {
    return (
      <div>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          {round?.name}
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span className="badge bg-success" style={{ fontSize: "20px" }}>
            เปิดอยู่ ณ ขณะนี้
          </span>{" "}
        </div>
      </div>
    );
  } else if (status === "Considering") {
    return (
      <div>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          {round?.name}
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span className="badge bg-warning" style={{ fontSize: "20px" }}>
            อยู่ระหว่างการพิจารณา
          </span>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span className="badge bg-secondary" style={{ fontSize: "20px" }}>
        ไม่มีประกาศ ณ ขณะนี้
      </span>
    </div>
  );
}

export default News;

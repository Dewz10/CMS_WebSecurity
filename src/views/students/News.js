import React from "react";

function News() {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h4 className="m-0"><span id="homePageTagHeader"><b>ยินดีต้อนรับเข้าสู่ระบบยื่นคำร้องฝึกงาน/สหกิจศึกษา</b></span></h4>
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
      <br></br>
      <div className="content">
        <div class="container-fluid">ไม่มีประกาศ</div>
      </div>
    </div>
  );
}

export default News;

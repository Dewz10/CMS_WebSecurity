import React from 'react'

function FormCompany() {
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
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        ระบุชื่อของผู้ที่จะให้ภาควิชาฯออกหนังสือ
                        ขอความอนุเคราะห์ฝึกงาน/สหกิจ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="requester_name"
                        placeholder="ระบุชื่อของผู้ที่จะให้ภาควิชาฯออกหนังสือ ขอความอนุเคราะห์ฝึกงาน/สหกิจ"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="requester_position">
                        ระบุตำแหน่งของผู้ที่จะให้ภาควิชาฯ
                        ออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="requester_position"
                        placeholder="ระบุตำแหน่งของผู้ที่จะให้ภาควิชาฯ 
                        ออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ"
                      />
                    </div>
                    <div className="form-group">
                      <label>สถานประกอบการ</label>
                      <input
                        type="text"
                        className="form-control"
                        id="company_name"
                        placeholder="ชื่อผู้ประสานงาน"
                        value={"บริษัท xxxxx จำกัด"}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="coordinator_name">ชื่อผู้ประสานงาน</label>
                      <input
                        type="text"
                        className="form-control"
                        id="coordinator_name"
                        placeholder="ชื่อผู้ประสานงาน"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="coordinator_phone">โทร</label>
                      <input
                        type="text"
                        className="form-control"
                        id="coordinator_phone"
                        placeholder="โทร"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="coordinator_email">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        id="coordinator_email"
                        placeholder="E-mail"
                      />
                    </div>
                    
                  </div>
                  {/* /.col */}
                  <div className="col-md-6">
      
                    <div className="row">
                      <div className="col-6">
                        <div class="form-group">
                          <label>ระยะเวลาตั้งแต่</label>
                          <div
                            class="input-group date"
                            id="reservationdate"
                            data-target-input="nearest"
                          >
                            <input
                              type="text"
                              id="start_date"
                              class="form-control datetimepicker-input"
                              data-target="#reservationdate"
                            />
                            <div
                              class="input-group-append"
                              data-target="#reservationdate"
                              data-toggle="datetimepicker"
                            >
                              <div class="input-group-text">
                                <i class="fa fa-calendar"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <label>ถึง</label>
                          <div
                            class="input-group date"
                            id="reservationdate1"
                            data-target-input="nearest"
                          >
                            <input
                              type="text"
                              id="end_date"
                              class="form-control datetimepicker-input"
                              data-target="#reservationdate1"
                            />
                            <div
                              class="input-group-append"
                              data-target="#reservationdate1"
                              data-toggle="datetimepicker"
                            >
                              <div class="input-group-text">
                                <i class="fa fa-calendar"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="payment_amount">
                        จำนวนค่าตอบแทน (บาท/วัน หรือ บาท/เดือน) (หรือ
                        ไม่มีค่าตอบแทน)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="payment_amount"
                        placeholder="จำนวนค่าตอบแทน (บาท/วัน หรือ บาท/เดือน) (หรือ ไม่มีค่าตอบแทน)"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="payment_amount">ที่พัก</label>
                      <div style={{ paddingRight: 35 }}></div>
                      <div className="accomodation" style={{ display: "flex" }}>
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="customRadioAccomodation1"
                            name="customRadio"
                          />
                          <label
                            htmlFor="customRadioAccomodation1"
                            className="custom-control-label"
                          >
                            มี
                          </label>
                        </div>
                        <div style={{ paddingRight: 35 }}></div>
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="customRadioAccomodation2"
                            name="customRadio"
                          />
                          <label
                            htmlFor="customRadioAccomodation2"
                            className="custom-control-label"
                          >
                            ไม่มี
                          </label>
                        </div>
                        <div style={{ paddingRight: 35 }}></div>
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="customRadioAccomodation3"
                            name="customRadio"
                          />
                          <label
                            htmlFor="customRadioAccomodation3"
                            className="custom-control-label"
                          >
                            อื่นๆ
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="accomodation"></label>
                        <input
                          type="text"
                          className="form-control"
                          id="accomodation"
                          placeholder="กรณีอื่นๆ"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <a href="https://www.facebook.com/cpe.eng.kps/?locale=th_TH">
                        ติดต่อสอบถามเพิ่มเติม
                      </a>
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
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "20%",
                      backgroundColor: "#03a96b",
                      border: "none",
                    }}
                  >
                    ส่งคำร้อง
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  )
}

export default FormCompany
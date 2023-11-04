import React, { useEffect, useState } from "react";
import axios from 'axios'
import Countdown from 'react-countdown';
import Count from "../../components/Count";



function News() {
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
  console.log(round?.considerationDate)
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
        <CheckStatus status={round?.applicationStatus} round={round}/>
        <FormatDate considerationDate={round?.considerationDate}/>
        <Count deadline={round?.considerationDate}/>
      </div>
    </div>
  );
}
function FormatDate(props){
  const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  let d = props.considerationDate
  const date = new Date(d)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return(
    <div>
      วันที่พิจารณา {day} {month} {year}
    </div>
  )
}

function CheckStatus(props){
  const status = props.status
  const round = props.round
  if(status==="Open"){
    return (
      <div>
        <h1>{round?.name}</h1>
        <h1>เปิดอยู่ ณ ขณะนี้</h1>
      </div>
    )
  }else if(status==="Considering"){
    return (
      <div>
        <h1>{round?.name}</h1>
        <h1>อยู่ระหว่างการพิจารณา</h1>
      </div>
    )
  }
  return (
    <h1>ไม่มีประกาศ ณ ขณะนี้</h1>
  )
}

export default News;

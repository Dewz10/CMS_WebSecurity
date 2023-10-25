import React, { useEffect, useState } from "react";
import axios from 'axios'

function News() {
  const [round,setRound] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/internship/application',{
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('access_token')
      }
    })
    .then(res => setRound(res.data.data))
    .catch(err => console.error(err))
  },[]) 
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
        {
          round?.map((data,i)=>{
            let item = round[round.length - 1]
  
            console.log(item)
            if(!item.applicationStatus.localeCompare("Open")){
              return (
                <div>
                  <h1 key={i}>{data.name}</h1>
                </div>
              )
            }
            else if(!item.applicationStatus.localeCompare("Considering")){
              return (
                <div>
                  <h1>อยู่ระหว่างการพิจารณา</h1>
                </div>
              )
            }
            else if(!item.applicationStatus.localeCompare("Close")){
              return (
                <div>
                  <h1>ไม่มีประกาศ ณ ขณะนี้</h1>
                </div>
              )
            }
          })  
        }
      </div>
    </div>
  );
}

export default News;

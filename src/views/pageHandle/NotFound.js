import React from 'react'
import '../pageHandle/notFound.css'
import notfound from '../../assets/no-results.png'

const NotFound = () => {
    return (
        <div className='nf-frame'>
          <div className='text'>
          <div className='logo-frame'>
              <img src={notfound} width="300px" height="300px"/>
            </div>
            ไม่พบหน้าที่คุณกำลังหา
    
          </div>
        </div>
      )
}

export default NotFound
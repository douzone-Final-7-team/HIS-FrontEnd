import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../styles/header.scss';

function Header({showNav}) {

  function logout() {
    localStorage.clear();
    window.location.href='http://myhisbucket.s3-website.ap-northeast-2.amazonaws.com/';
  }

  const [headerInfo, setHeaderInfo] = useState([{}]);
  const token = localStorage.getItem('jwt') || '';

  useEffect(() => {
    if(token !== '') {
    axios.get("http://43.200.169.159:9090/user/headerInfo",
      {headers : {'Authorization': token}}
    ).then((res) => {
      setHeaderInfo(res.data)
    })
  }
  }, [token])

  return (
    <div>
      {showNav ?
      <div className='header'>
      <div className='profile'>
        <div className='profile-img'></div>
        {/* <img src='https://mv.amaranth10.co.kr/custom/img/labal_pic_.png' /> */}
        <div className='emp-name'>{headerInfo[0].SPECIALITY_NAME} {headerInfo[0].EMP_NAME}{headerInfo[0].WORK}</div>
        <button className='logout' onClick={logout}>LogOut</button>
      </div>
      <div className='emp-role'></div>
      </div>
      :
      <div className='header'>
      <div className='profile'>
      <div className='profile-imoticon'></div>
      <div className='emp-name'>더조은 병원</div>
    </div>
    <div className='emp-role'></div>
    </div>
      }
    </div>
  )
}


export default Header

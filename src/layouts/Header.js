import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../styles/header.scss';

function Header() {

  const [headerInfo, setHeaderInfo] = useState([{}]);
  const token = localStorage.getItem('jwt') || '';

  function logout() {
    localStorage.removeItem('jwt')
    window.location.href='http://localhost:3000/';
  }
  useEffect(() => {

    axios.get("http://localhost:9090/user/headerInfo", {
      headers : {'Authorization': token,}
    })
    .then((res) => {
      console.log(res.data);
      setHeaderInfo(res.data);
    });

  }, [token]);

  return (
    <div className='header'>
      <div className='profile'>
        <div className='profile-img'></div>
        {/* <img src='https://mv.amaranth10.co.kr/custom/img/labal_pic_.png' /> */}
        <div className='emp-name'>{headerInfo[0].SPECIALITY_NAME} {headerInfo[0].EMP_NAME}</div>
        <a href='#!' className='logout' onClick={logout}>로그아웃</a>
      </div>
      <div className='emp-role'>{headerInfo[0].WORK}</div>
    </div>
  )
}

export default Header

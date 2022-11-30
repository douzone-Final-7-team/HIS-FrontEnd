import React from 'react'
import '../styles/header.scss';

function Header() {
  const name = window.localStorage.getItem('name');
  const specialityName = window.localStorage.getItem('specialityName');
  function logout() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('name')
    localStorage.removeItem('userName')
    localStorage.removeItem('specialityName')
    window.location.href='http://localhost:3000/';
  }
  return (
    <div className='header'>
      <div className='profile'>
        <div className='profile-img'></div>
        {/* <img src='https://mv.amaranth10.co.kr/custom/img/labal_pic_.png' /> */}
        <div className='emp-name'>{specialityName} {name}</div>
        <btn className='logout' onClick={logout}>로그아웃</btn>
      </div>
      <div className='emp-role'>업무내용</div>
    </div>
  )
}

export default Header

import React from 'react'
import '../styles/header.scss';

function Header() {

  function logout() {
    localStorage.removeItem('jwt')
    window.location.href='http://localhost:3000/';
  }
  return (
    <div className='header'>
      <div className='profile'>
        <div className='profile-img'></div>
        {/* <img src='https://mv.amaranth10.co.kr/custom/img/labal_pic_.png' /> */}
        <div className='emp-name'>진료과 채송화</div>
        <a href='#!' className='logout' onClick={logout}>로그아웃</a>
      </div>
      <div className='emp-role'>업무내용</div>
    </div>
  )
}

export default Header

import React from 'react'
import '../styles/header.scss';

function Header({showNav}) {
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
      {showNav ?
      <div className='profile'>
        <div className='profile-img'></div>
        {/* <img src='https://mv.amaranth10.co.kr/custom/img/labal_pic_.png' /> */}
        <div className='emp-name'>{specialityName} {name}</div>
        <p className='logout' onClick={logout}>로그아웃</p>
      </div>
      :
      <div className='profile'>
      <div className='profile-imoticon'></div>
      <div className='emp-name'>더조은 병원</div>
    </div>
      }
      <div className='emp-role'></div>
    </div>
  )
}

export default Header

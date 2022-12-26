import React from 'react'
import { useLocation, Link } from "react-router-dom"
import './nav.scss';
import { TbNurse, TbSettings } from "react-icons/tb";
import { RiStethoscopeFill, RiHospitalLine } from "react-icons/ri";
import { AiOutlineBarChart } from "react-icons/ai";
import NavItem from './NavItem';


const Nav = () => {
  // url의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;
  let menus;
  if(window.localStorage.getItem('status') === '퇴직') {
    menus = [
      { img: <TbSettings />, path: '/my-page'}  //마이페이지
    ]
  }
  else if(window.localStorage.getItem('role') === 'ROLE_OUTRECEIPT'){
    menus = [
      { img: <RiHospitalLine />, path: '/reception'}, // 원무
      { img: <TbSettings />, path: '/my-page'}  //마이페이지
    ]
  } else if(window.localStorage.getItem('role') === 'ROLE_INRECEIPT') {
    menus = [
      { img: <RiHospitalLine />, path: '/ward-management'},  //원무병동
      { img: <TbSettings />, path: '/my-page'}  //마이페이지
    ]
  } else if(window.localStorage.getItem('role') === 'ROLE_INNURSE') {
    menus = [
      { img: <TbNurse />, path: '/ward-management2'},  //병간
      { img: <TbSettings />, path: '/my-page'}  //마이페이지
    ]
  } else if(window.localStorage.getItem('role') === 'ROLE_OUTNURSE') {
    menus = [
      { img: <TbNurse />, path: '/outpatient'},  // 외래간호
      { img: <TbSettings />, path: '/my-page'}  //마이페이지
    ]
  } else {
    menus = [
      { img: <RiStethoscopeFill />, path: '/doctor'},  //의사
      { img: <AiOutlineBarChart />, path: '/stastic'},  //경영
      { img: <TbSettings />, path: '/my-page'}  //마이페이지
    ]
  }

  return (
    <div className='nav'>
      
      <div className='nav-menu'>
        {menus.map((menu, index) => {
          return (
            <Link to={menu.path} key={index}>
              <NavItem menu={menu} isActive={pathName === menu.path ? true : false}/>
            </Link>
          );
        })}
      </div>

    </div>
  )
}

export default Nav


import React from 'react'
import { useLocation, Link } from "react-router-dom"
import './nav.scss';
import { TbBuildingHospital, TbNurse } from "react-icons/tb";
import NavItem from './NavItem';


const Nav = () => {
  // url의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;

const menus = [
  
  { img: <TbBuildingHospital/>, path: '/reception'}, // 원무
  { img: <TbNurse/>, path: '/outpatient'},  //외래간호
]
  return (
    <div className='nav'>
      
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <NavItem menu={menu} isActive={pathName === menu.path ? true : false}/>
          </Link>
        );
      })}
    </div>
  )
}

export default Nav


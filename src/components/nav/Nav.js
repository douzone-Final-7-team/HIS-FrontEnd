import React from 'react'
import { useLocation, Link } from "react-router-dom"
import './nav.scss';
import { TbNurse } from "react-icons/tb";
import NavItem from './NavItem';

// url의 path값을 받아올 수 있다.
// const pathName = useLocation().pathname;

const menus = [
  { img: <TbNurse/>, name: "외래간호", path: '/reception'},
  { img: <TbNurse/>, name: "외래간호", path: '/reception'}
]
const Nav = () => {
  return (
    <div className='nav'>
      
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <NavItem menu={menu}/>
            {/* <NavItem menu={menu} isActive={pathName === menu.path ? true : false}/> */}
          </Link>
        );
      })}
    </div>
  )
}

export default Nav


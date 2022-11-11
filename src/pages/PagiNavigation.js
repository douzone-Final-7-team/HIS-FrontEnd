import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// style
import '../styles/body.scss';
// components
import Nav from '../components/nav/Nav';
import Header from '../layouts/Header';
import Reception from './Reception';
import Doctor from './Doctor';
import Outpatient from './Outpatient';
import WardManagement from './WardManagement';
import WardManagement2 from './WardManagement2';
import MyPage from './MyPage';

const PagiNavigation = () => {
  return(
    <div className='view'>
      <BrowserRouter>
        <div className='layout'>
          <header><Header /></header>
          <nav><Nav /></nav>
          <div>
            <Routes>
              <Route path="/reception" element={<Reception />} />
              <Route path="/doctor" element={<Doctor/>} />
              <Route path='/outpatient' element={<Outpatient/>} />
              <Route path='/ward-management' element={<WardManagement/>} />
              <Route path='/ward-management2' element={<WardManagement2/>} />
              <Route path='/my-page' element={<MyPage/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default PagiNavigation;
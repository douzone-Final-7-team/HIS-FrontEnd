import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

const index = () => {
  return(
    <div className='view'>
      <BrowserRouter>
        <div className='layout'>
          <header><Header /></header>
          <nav><Nav /></nav>
          <div>
            <Routes>
              <Route path="/" element={<Reception />} />
              <Route path="/" element={<></>} />
              <Route path='/' element={<></>} />
              <Route path='/' element={<></>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default index

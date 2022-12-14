import React, {useState } from 'react';
import '../styles/login.scss';
import axios from 'axios';
import logo from '../assets/DOUZONE.png';
import { alertSweetError } from '../components/higher-order-function/Alert';

const Login = () => {

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  
  const userLogin = () => {
    axios.post("http://43.200.169.159:9090/login", {
    username: inputId,
    pw: inputPw
    })
    .catch(() => {
      alertSweetError('로그인 불가', '계정 정보가 일치하지 않습니다', Done)
      function Done() {
        window.location.reload();
      }
    })
    .then((res)=>{
      if(res.headers.get('Authorization')!==undefined){localStorage.setItem('jwt', res.headers.get('Authorization'))}
    })
    .then(() => {
      axios.post("http://43.200.169.159:9090/user/myPage", {}, {
          headers : {'Authorization': localStorage.getItem('jwt')}
      })
      .then((res) => {
        localStorage.setItem('userName', res.data[0].USERNAME);
        localStorage.setItem('empIdPk', res.data[0].EMP_ID_PK);
        localStorage.setItem('name', res.data[0].EMP_NAME);
        localStorage.setItem('specialityName', res.data[0].SPECIALITY_NAME);
        localStorage.setItem('role', res.data[0].ROLE);
        localStorage.setItem('ward', res.data[0].WARD);
        localStorage.setItem('specialityID', res.data[0].SPECIALITY_ID_FK);
        localStorage.setItem('status', res.data[0].EMP_STATUS);

        if(res.data[0].EMP_STATUS === '퇴직') {
          window.location.href = 'http://myhisbucket.s3-website.ap-northeast-2.amazonaws.com/my-page';
        }
        else if(res.data[0].ROLE === 'ROLE_DOCTOR') {
          window.location.href = 'http://myhisbucket.s3-website.ap-northeast-2.amazonaws.com/doctor';
        } else if (res.data[0].ROLE === 'ROLE_INNURSE') {
          window.location.href = 'http://myhisbucket.s3-website.ap-northeast-2.amazonaws.com/ward-management2';
        } else if (res.data[0].ROLE === 'ROLE_OUTNURSE') {
          window.location.href = 'http://myhisbucket.s3-website.ap-northeast-2.amazonaws.com/outpatient';
        } else if (res.data[0].ROLE === 'ROLE_OUTRECEIPT') {
          window.location.href = 'http://myhisbucket.s3-website.ap-northeast-2.amazonaws.com/reception';
        } else if (res.data[0].ROLE === 'ROLE_INRECEIPT') {
          window.location.href = 'http://myhisbucket.s3-website.ap-northeast-2.amazonaws.com/ward-management';
        }
      }); 
    })
  }

    return (
        <div className='wrap'>
          <div className='his'>
            <h1>Health Information <br/>System</h1>
            <h2>헬스케어솔루션사업본부</h2>
          </div>
          <div className='login-wrap'>
            <div className='login-form'>
              <h1><img src={logo} alt='logo'/></h1>
              <form>
                <input 
                  value={inputId} 
                  onChange={(e) => {
                    setInputId(e.target.value);
                  }} 
                  placeholder='아이디를 입력 해주세요' 
                /><br/>
                  <input 
                  value={inputPw} 
                  onChange={(e) => {
                    setInputPw(e.target.value);
                  }} 
                  onKeyPress={() => window.event.keyCode === 13 ? userLogin() : ''}
                  type = "password" 
                  placeholder='비밀번호를 입력해주세요' 
                /><br/> 
                <a
                  href='#!'
                  className='btn' 
                  onClick={() => {
                    userLogin();
                  }}
                >로그인</a>
              </form>
            </div>
          </div>
        </div>
    )
}

export default Login;
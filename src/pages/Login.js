import React, { useState } from 'react';
import '../styles/login.scss';
import axios from 'axios';
import logo from '../assets/DOUZONE.png';

const Login = () => {

    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    const userLogin = () => {
      axios.post("http://43.200.169.159:9090/login", {
        username: inputId,
        pw: inputPw
        }).then((res)=>{
          console.log(res.headers.get('Authorization'))
          localStorage.setItem('jwt', res.headers.get('Authorization'))
        });
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

// export default Login;
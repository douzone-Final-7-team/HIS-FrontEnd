import react, { useState } from 'react';
import '../styles/login.scss';
import axios from 'axios';
import logo from '../assets/DOUZONE.png';
import { API_URL } from '../utils/constants/Config'
import Reception from './Reception';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3000';
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.post["Access-Control-Allow-Methods"] = 'post';
axios.defaults.headers.post["Access-Control-Allow-Headers"] = '*';

// axios.post("http://localhost:9090/login", {
//   username: "rladmltk",
//   pw: "1234"
//   }).then((res)=>{
//     console.log(res.headers.get('Authorization'))
//     localStorage.setItem('jwt', res.headers.get('Authorization'))
//   }).then(() => {
//     if(localStorage.getItem('jwt')) {
//       console.log()
//     }
//   });


const Login = () => {

    let navigate = useNavigate();

    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    
    const handleInputId = (e) => {
      setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
      setInputPw(e.target.value);
    };

    const OnClickd = () =>{
      axios.post("http://localhost:9090/login", {
        username: inputId,
        pw: inputPw
        }).then((res)=>{
          console.log(res.headers.get('Authorization'))
          localStorage.setItem('jwt', res.headers.get('Authorization'))
        });
    }
    
    // const test = () => {
    //   window.location.href = "http://localhost:3000/login";
    // }
    
    return (
        <>
        <div className='wrap'>
          <div className='his'>
            <h1>Health Information <br/>System</h1>
            <h2>헬스케어솔루션사업본부</h2>
          </div>
          <div className='login-wrap'>
            <div className='login-form'>
              <h1><img src={logo} alt='logo'/></h1>
              <form action=''>
                <input value={inputId} onChange={handleInputId} placeholder='아이디를 입력 해주세요'></input><br/>
                <input value={inputPw} onChange={handleInputPw} type = "password" placeholder='비밀번호를 입력해주세요'></input><br/>
                <button onClick={() => OnClickd()}>로그인</button>
              </form>
            
            </div>
          </div>
        </div>
        </>
    )
}

export default Login;
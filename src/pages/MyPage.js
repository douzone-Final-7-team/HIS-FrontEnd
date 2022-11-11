import React from "react";


// style
import '../styles/scss/reset.scss';
import '../styles/mypage.scss';

// components
import Header from '../layouts/Header';
import Nav from '../components/nav/Nav';
import EmpBar from '../components/employee/EmpBar';

const MyPage = () => {
    return(
        <div className="myPage">
            <header><Header /></header>
            <nav><Nav /></nav>
            <main className="main">
            <div className='top'>
                <EmpBar />
            </div>
            <div className="infoBox">
                <p className="infoTitle">개인정보</p>
                <hr />
                <div className="infoContent">
                    <ul className="infoUl">
                        <li className="infoLi"><label className="infoLabel">이름</label> <input className="infoInput" readOnly/></li>
                        <li className="infoLi"><label className="infoLabel">주민등록번호</label> <input className="infoInput" readOnly /></li>
                        <li className="infoLi"><label className="infoLabel">아이디</label> <input className="infoInput" readOnly /></li>
                        <li className="infoLi"><label className="infoLabel">비밀번호</label> <input className="infoInput" readOnly /></li>
                        <button className="pwChange">비밀번호 변경</button>
                    </ul>
                </div>
            </div>

            <div className="jobBox">
                <p className="jobTitle">직종정보</p>
                <hr />
                <div className="jobContent">
                    <ul className="jobUl">
                        <li className="jobLi"><label className="jobLabel">직종</label><input className="jobInput" readOnly /></li>
                        <li className="jobLi"><label className="jobLabel">사원번호</label><input className="jobInput" readOnly /></li>
                        <li className="jobLi"><label className="jobLabel">면허번호</label><input className="jobInput" readOnly /></li>
                        <li className="jobLi"><label className="jobLabel">진료과</label><input className="jobInput" readOnly /></li>
                    </ul>
                    <ul className="jobUl">
                        <li className="jobLi"><label className="jobLabel">재직구분</label><input className="jobInput" readOnly /></li>
                        <li className="jobLi"><label className="jobLabel">면호번호</label><input className="jobInput" readOnly /></li>
                        <li className="jobLi"><label className="jobLabel">입사일</label><input className="jobInput" readOnly /></li>
                        <li className="jobLi"><label className="jobLabel">주소</label><input className="jobInput" readOnly /></li>
                        <button className="addrChange">주소 변경</button>
                    </ul>
                </div>
            </div>
            </main>
        </div>
    )
}

export default MyPage;
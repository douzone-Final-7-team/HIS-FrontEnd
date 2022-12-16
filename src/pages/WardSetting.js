import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SearchAddEvent } from "../components/higher-order-function/SearchFuction";
import '../styles/wardSetting.scss'




function WardSetting({inPatientALL,setInPatientALL, setShowRegiInPatient}) {


  const serachInAllPatient = useRef("")
  const [inPatientAllList, setInPatientAllList]=useState([])
      useEffect(()=>{
        axios.get('http://localhost:9090/wardCheck/ocuupiedAllList')
        .then(res=> setInPatientAllList(res.data))
      },[])

      useEffect(()=>{

        const addHTMLFunc = (acc)=>{
        return( `
        <div class="suggest-container">
          <a style= 'border-bottom:1px #EAEAEA solid; color:black; display:block; height: 25px' 
          id =${acc.PATIENT_NAME} name=${acc.WARDROOM}${acc.BED_NUM}>
          이름: ${acc.PATIENT_NAME} , 호실 : ${acc.WARDROOM}, 병상번호: ${acc.BED_NUM}</a>
        </div>`)};

        const setAllFunc = (e)=>{
          return (setInPatientALL(()=>{
            return({
              name: e.target.id,
              ward : (e.target.name + "").substring(0,1)*100,
              roomNum : ("" + e.target.name).substring(2,3),
              bedNum : ("" + e.target.name).substring(3),
              wardRoom: (e.target.name + "").substring(0,3)
            }) 
        }))
        }
        const searchTarget ="PATIENT_NAME";

        SearchAddEvent("searchPatientInput","searchPatientInput-container", "searchPatientInput-list", inPatientAllList, addHTMLFunc, setAllFunc ,searchTarget)
      },[setInPatientALL,serachInAllPatient,inPatientAllList])

      useEffect(()=>{
        const searchInput = document.getElementById("searchPatientInput")
        searchInput.value = searchInput.defaultValue
      },[inPatientALL])
      
 
  return (
    <div className="wardSetting-wapper">
        <div className="wardSetting-Body">
          <div id="wardSetting-content">
              <h3>입원 환자 등록</h3>
              <fieldset className="search-patient">
                  <h5>환자명</h5>
                  <input id ='searchPatientInput' type="text" tabIndex="2" placeholder= '환자명을 검색하세요' defaultValue={inPatientALL.name} onChange={(e)=>serachInAllPatient.current=(e.target.value)}/>
                    <div id="searchPatientInput-container">
                        <ul id="searchPatientInput-list"></ul>
                    </div>
              </fieldset> 
          </div>
          <fieldset>
                <button name="submit" type="btn" className="inRegister-btn" onClick={()=>setShowRegiInPatient(false)}>등록</button>
            </fieldset>
        </div>
    </div>
  );
}
 
export default WardSetting;
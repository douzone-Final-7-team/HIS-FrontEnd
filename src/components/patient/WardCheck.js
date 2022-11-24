import axios from 'axios';
import React, { useEffect, useState } from 'react'
// style
import './wardCheck.scss';

//redux
import { useDispatch } from 'react-redux';
import {getCareInfo, getInpatientInfo, getMediRecords} from '../../redux/AdmissionPatientInfoApi';
import { selectPeople } from '../../redux/outPatientInfoSlice';
import { API_URL } from '../../utils/constants/Config';


let data = {
  empIdPk : 'O220019' //세션에 있는 사번
}

const WardOpions = [
  { key:"1", value : "" , name : "병동선택"},
  { key:"2", value : "200" , name : "내과 : 200"},
  { key:"3", value : "300" , name : "정형외과 : 300"},
  { key:"4", value : "400" , name : "이빈후과 : 400"},
];

const RoomOpions = [
  { key:"1" , value : "" , name : "호실선택"},
  { key:"2" , value : "1" , name : "1호실"},
  { key:"3" , value : "2" , name : "2호실"},
  { key:"4" , value : "3" , name : "3호실"},
  { key:"5" , value : "4" , name : "4호실"},
  { key:"6" , value : "5" , name : "5호실"},
];



const WardCheck = () => {

  const selectedadPeople = [];

  let selectedOutInfo;
  const dispatch = useDispatch();
 
    const sendWardbasicData = () =>{
      for(let i=0 ; i < document.getElementById('aaa').childNodes.length ; i++){
        selectedadPeople[i] = document.getElementById('aaa').childNodes[i].innerText
      }
        selectedOutInfo = {
        "name": selectedadPeople[2],
        "ward" : selectedadPeople[1].substr(0,1)*100,
        "roomNum" : selectedadPeople[1].substr(2,1),
        "bedNum" : selectedadPeople[0]
      }

      dispatch(selectPeople(selectedOutInfo))
      selectedOutInfo = JSON.stringify(selectedOutInfo)
     
      // 비동기 정보
      dispatch(getInpatientInfo(selectedOutInfo));
      dispatch(getCareInfo(selectedOutInfo));
      dispatch(getMediRecords(selectedOutInfo))
    }
  
    // console.log(data.empIdPk);
    // data.ward = "200";

  const [roomInfos, setRoomInfos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [ward, setWard] = useState([]);
  const [room, setRoom] = useState([]);

  // if(data.empIdPk.indexOf("O") !== -1){
  //   data.ward = "200";
  //   setWard("200");
  // }


  
    
  
    useEffect(()=>{
      axios.get(API_URL+"/admission/roominfos", {params : data})
        .then(res => setRoomInfos(res.data));  
    },[selected]);
    
    const wardHandleChange = (e) => {
        
      // console.log(e.target.value);
      data.ward = e.target.value;
      setWard(e.target.value);
      setSelected(e.target.value);
    }

    const WardSelectBox = (props) =>{
       
      return (
        <select onChange={wardHandleChange} value={ward}>
              {props.options.map((option) => (
                  <option
                    defaultValue={props.defaultValue === option.value}
                    key={option.value}
                    value={option.value}
                    
                  >
                    {option.name}
                  </option>
              ))}
        </select>
      )
    }
    const roomHandleChange = (e) => {
        
      // console.log(e.target.value);
      data.roomNum = e.target.value;
      // console.log(data);
      setRoom(e.target.value);
      setSelected(e.target.value);
      
    }

    const RoomSelectBox = (props) =>{
      return (
        <select onChange={roomHandleChange} value={room}>
              {props.options.map((option) => (
                  <option
                    defaultValue={props.defaultValue === option.value}
                    key={option.value}
                    value={option.value}
                    
                  >
                    {option.name}
                    
                  </option>
                  
              ))}
        </select>
      )
    }

    
    
  return (
    <div className='ward-check'>
      <div className='filter'>
        {/* {data.empIdPk.indexOf("O") !== -1  ? <WardSelectBox options={WardOpions} defaultValue=''/> : <WardSelectBox options={WardOpions} defaultValue='200'/>} */}
        <WardSelectBox options={WardOpions} defaultValue=''/>
        <RoomSelectBox options={RoomOpions} defaultValue=''/>
      </div>
      <div className='table-wrapper'>
          <table className="styled-table">
            <thead>
              <tr>
                <th>-</th>
                <th>병실</th>
                <th>이름</th>
                <th>주치의</th>
              </tr>
          </thead>
          <tbody>
            {/* <tr>
                <td>1</td>
                <td>201</td>
                <td onClick={sendWardbasicData}>배병서</td>
                <td>홍길동</td>
            </tr> */}
            {roomInfos.map((wardNum) => (
              <tr id ='aaa'>
                <td onClick={sendWardbasicData}>{wardNum.BED_NUM}</td>
                <td onClick={sendWardbasicData}>{wardNum.WARDROOM}</td>
                <td onClick={sendWardbasicData}>{wardNum.PATIENT_NAME}</td>
                <td onClick={sendWardbasicData}>{wardNum.EMP_NAME}</td>
              </tr>
              
            ))}
            
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default WardCheck;

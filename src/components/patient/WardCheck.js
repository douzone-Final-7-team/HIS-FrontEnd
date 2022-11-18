import axios from 'axios';
import React, { useEffect, useState } from 'react'
// style
import './wardCheck.scss';

let data = {
  empIdPk : 'O220019' //세션에 있는 사번

}

const WardOpions = [
  { key : "" , value : "" , name : "병동선택"},
  { key : "ward" , value : "200" , name : "내과 : 200"},
  { key : "ward" , value : "300" , name : "정형외과 : 300"},
  { key : "ward" , value : "400" , name : "이빈후과 : 400"},
];

const RoomOpions = [
  { key : "" , value : "" , name : "호실선택"},
  { key : "roomNum" , value : "1" , name : "1호실"},
  { key : "roomNum" , value : "2" , name : "2호실"},
  { key : "roomNum" , value : "3" , name : "3호실"},
  { key : "roomNum" , value : "4" , name : "4호실"},
  { key : "roomNum" , value : "5" , name : "5호실"},
];


// const RoomSelectBox = (props) =>{

//   return (
//     <select>
//           {props.options.map((option) => (
//               <option
//                 key={option.value}
//                 value={option.value}
//               >
//                 {option.name}
//               </option>
//           ))}
//     </select>
//   )
// }





const WardCheck = () => {
  const [roomInfos, setRoomInfos] = useState([]);
  const [test, setTest] = useState([]);
  console.log("let : " + JSON.stringify(data));
    useEffect(()=>{
      axios.get("http://localhost:9090/admission/roominfos", {params : data})
          .then(res => setRoomInfos(res.data));
    },[test]);

    console.log(roomInfos);
    console.log("아아아아아"+test);

    const WardSelectBox = (props) =>{
      const wardHandleChange = (e) => {
        let ward = '';
        ward = e.target.value;
        console.log("Change : "+ward);
        data.ward = ward;
        console.log("Data : "+data.ward);
        setTest(...test,ward);
        console.log("selectBox : "+test);
      }
      
      return (
        <select onChange={wardHandleChange}>
              {props.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.name}
                  </option>
              ))}
        </select>
      )
    }

    const RoomSelectBox = (props) =>{
      const roomHandleChange = (e) => {
        let roomNum = '';
        roomNum = e.target.value;
        console.log("Change : "+roomNum);
        data.roomNum = roomNum;
        console.log("Data : "+data.roomNum);
        setTest(...test,roomNum);
        console.log("selectBox : "+test);
      }
      
      return (
        <select onChange={roomHandleChange}>
              {props.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.name}
                  </option>
              ))}
        </select>
      )
    }


    
    console.log("selectbox(data) : " + data.empIdPk);
    console.log("selectbox(data) : " + data.ward);
    console.log("selectbox(data) : " + data.roomNum);

  return (
    <div className='ward-check'>
      <div className='filter'>
        <WardSelectBox options={WardOpions}/>
        <RoomSelectBox options={RoomOpions}/>
      </div>
      <div className='table-wrapper'>
          <table class="styled-table">
            <thead>
              <tr>
                <th>-</th>
                <th>병실</th>
                <th>이름</th>
                <th>주치의</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>201</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>2</td>
                <td>202</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>3</td>
                <td>203</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>4</td>
                <td>204</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>5</td>
                <td>205</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>6</td>
                <td>301</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>7</td>
                <td>302</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>8</td>
                <td>303</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>9</td>
                <td>304</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>10</td>
                <td>305</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>11</td>
                <td>401</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>12</td>
                <td>402</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>13</td>
                <td>403</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>14</td>
                <td>404</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
            <tr>
                <td>15</td>
                <td>40</td>
                <td>김더존</td>
                <td>홍길동</td>
            </tr>
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default WardCheck;

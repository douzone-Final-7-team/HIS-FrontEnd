import React from 'react'
// style
import './wardCheck.scss';

//redux
import { useDispatch } from 'react-redux';
import {getInpatientInfo} from '../../redux/AdmissionPatientInfoApi';
import { selectPeople } from '../../redux/outPatientInfoSlice';

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

      selectedOutInfo = JSON.stringify(selectedOutInfo)

      dispatch(selectPeople(selectedOutInfo))
 
      // 비동기 정보
      dispatch(getInpatientInfo(selectedOutInfo));

    }
    

  return (
    <div className='ward-check'>
      <div className='filter'>
        <select>
          <option>병동조회</option>
          <option>200</option>
          <option>300</option>
          <option>400</option>
        </select>
        <select>
          <option>병실조회</option>
          <option>201</option>
          <option>202</option>
          <option>203</option>
          <option>204</option>
          <option>205</option>
        </select>
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
            <tr id ='aaa'>
                <td>1</td>
                <td>201</td>
                <td onClick={sendWardbasicData}>배병서</td>
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

import React from "react";
// style
import '../../styles/scss/reset.scss';
import '../../components/doctor/AddModal.scss';

const AddModal = () => {

    return(
        <div className="add-box">
            <header>
                <p>일정 등록</p>
                <hr />
            </header>
            <div className="add-div">
                <table>
                    <tbody>
                        <tr>
                            <th>일정 종류</th>
                            <td>
                                <select>
                                    <option>병원 일정</option>
                                    <option>의사 일정</option>
                                    <option>개인 일정</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>시간</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td><input /></td>
                        </tr>
                        <tr>
                            <th>장소</th>
                            <td><input /></td>
                        </tr>
                        <tr>
                            <th>일정 내용</th>
                            <td><input /></td>
                        </tr>
                    </tbody>
                </table>
                <button>등 록</button>
            </div>
        </div>
    )

}

export default AddModal
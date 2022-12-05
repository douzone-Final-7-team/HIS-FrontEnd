import React, { useState } from "react";
// style
import '../../styles/scss/reset.scss';
import '../../components/doctor/DoctorSchedule.scss';
import '../../components/doctor/ScheduleModal.scss';
import { CgCloseR } from "react-icons/cg";

//component
import ScheduleModal from "./ScheduleModal";
import AddModal from "./AddModal";

const DoctorScheduleModal = (props) => {

    const [addSchedule, setAddSchedule] = useState(false);
    
    return(
        <div className="schedule-box">
            <main>
                <div>
                    <p>일정 관리</p>
                    <hr />
                    <br />
                    <div className="schedule-div">
                        <p className="date">{props.modalDate}</p>
                        <button className="btn" onClick={() => setAddSchedule(!addSchedule)}>일정 추가</button>
                        {addSchedule && (
                        <ScheduleModal closeModal={() => setAddSchedule(!addSchedule)}>
                            <AddModal />
                        </ScheduleModal>
                        )}
                        <div className="count">
                            <span className="count-span">3개의 일정</span>
                        </div>

                        <div className="checkbox">
                                <input type={"checkbox"} /> <span className="checkbox-span">개인 일정</span>
                                <input type={"checkbox"} /> <span className="checkbox-span">병원 일정</span>
                                <input type={"checkbox"} /> <span className="checkbox-span">의사 일정</span>
                        </div>
                        <div className="schedule-content">
                            <div className="section1">
                                <span className="category">병원 일정 </span> &nbsp; <span>어린이날 특별음악회</span> <CgCloseR className="icon" />
                            </div>
                            <div className="section2">
                                <span>시간 : </span> <span className="content-span">11:00</span> &nbsp; <span>장소 : </span> <span className="content-span">1층 메인홀</span> <br/>
                                <span>내용 : </span> <span className="content-span">어린이날을 맞이해 어린 환자들을 위한 특별음악회</span>
                            </div>
                        </div>

                        <div className="schedule-content">
                            <div className="section1">
                                <span className="category">병원 일정 </span> &nbsp; <span>어린이날 특별음악회</span> <CgCloseR className="icon" />
                            </div>
                            <div className="section2">
                                <span>시간 : </span> <span className="content-span">11:00</span> &nbsp; <span>장소 : </span> <span className="content-span">1층 메인홀</span> <br/>
                                <span>내용 : </span> <span className="content-span">어린이날을 맞이해 어린 환자들을 위한 특별음악회</span>
                            </div>
                        </div>

                        <div className="schedule-content">
                            <div className="section1">
                                <span className="category">병원 일정 </span> &nbsp; <span>어린이날 특별음악회</span> <CgCloseR className="icon" />
                            </div>
                            <div className="section2">
                                <span>시간 : </span> <span className="content-span">11:00</span> &nbsp; <span>장소 : </span> <span className="content-span">1층 메인홀</span> <br/>
                                <span>내용 : </span> <span className="content-span">어린이날을 맞이해 어린 환자들을 위한 특별음악회</span>
                            </div>
                        </div>

                        <div className="schedule-content">
                            <div className="section1">
                                <span className="category">병원 일정 </span> &nbsp; <span>어린이날 특별음악회</span> <CgCloseR className="icon" />
                            </div>
                            <div className="section2">
                                <span>시간 : </span> <span className="content-span">11:00</span> &nbsp; <span>장소 : </span> <span className="content-span">1층 메인홀</span> <br/>
                                <span>내용 : </span> <span className="content-span">어린이날을 맞이해 어린 환자들을 위한 특별음악회</span>
                            </div>
                        </div>

                        <div className="schedule-content">
                            <div className="section1">
                                <span className="category">병원 일정 </span> &nbsp; <span>어린이날 특별음악회</span> <CgCloseR className="icon" />
                            </div>
                            <div className="section2">
                                <span>시간 : </span> <span className="content-span">11:00</span> &nbsp; <span>장소 : </span> <span className="content-span">1층 메인홀</span> <br/>
                                <span>내용 : </span> <span className="content-span">어린이날을 맞이해 어린 환자들을 위한 특별음악회</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DoctorScheduleModal;
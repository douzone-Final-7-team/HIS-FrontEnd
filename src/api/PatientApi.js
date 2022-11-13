import axios from 'axios'
import { API_URL } from '../utils/constants/Config'

// 전체 리스트 가져오기
export const allPatient = () => {
    return axios.get(`${API_URL}/board`).then(res=> console.log(res))
}

// 한가지의 정보만 가져온다
export const getPatient = (id) => {
    return axios.get(`${API_URL}/patient/${id}`)
}



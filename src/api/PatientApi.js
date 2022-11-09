import axios from 'axios'

import { API_URL } from '../utils/constatns/Config'



// 한가지의 정보만 가져온다
export const getPatient = (id) => {
    return axios.get(`${API_URL}/patient/${id}`)
}



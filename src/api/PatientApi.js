import axios from 'axios'
import { API_URL } from '../utils/constants/Config'


// test
export const getPatient = (inputValue) => {
    return axios.get(`${API_URL}/patient/${inputValue}`)
}


// import PatientApi from '../../../api/PatientApi';

const PatientAction = {
    getTest: (inputValue) => async (dispatch) => {
        //  --> 비동기 액션의 상태값

        try {
            // const result = await PatientApi.getPatient(inputValue); // API 호출부분 ( await )
            // dispatch(find(result))

        } catch (error) {
            // dispatch({
            //     type: Types.GET_PATITENT_FAILURE,
            //     payload: error.toString()
            // })       --> 비동기 액션의 상태값
            
        }
    }
}

export default PatientAction;
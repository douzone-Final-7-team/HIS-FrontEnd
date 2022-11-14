import PatientApi from '../../../api/PatientApi';
import { find } from '../../Slice';

const PatientAction = {
    getTest: (inputValue) => async (dispatch) => {
        dispatch({ find });

        try {
            // const result = await PatientApi.getPatient(inputValue); // API 호출부분 ( await )

            // if (!result) throw new Error(`Error adding patient: ${result}`); // 예외처리

            // dispatch(find(result.data))

        } catch (error) {
            // dispatch({
            //     type: Types.GET_PATITENT_FAILURE,
            //     payload: error.toString()
            // })
        }
    }

}

export default PatientAction;
import * as PatitentApi from '../../../api/PatientApi'
import Types from '../../Actions'
import * as UserApi from '../../../api/UserApi'

const PatientAction = {
    getTest: () => async (dispatch) => {
        // 이런 타입으로 reducer 한테 요청 
        dispatch({ type: Types.GET_PATITENT });

        try {
            const result = await PatitentApi.getTest(); // API 호출부분 ( await )

            if (!result) throw new Error(`Error adding patitent: ${result}`); // 예외처리

            dispatch({
                type: Types.GET_PATITENT_SUCCESS,
                payload: result.data
            })

        } catch (error) {
            dispatch({
                type: Types.GET_PATITENT_FAILURE,
                payload: error.toString()
            })
        }
    }

}

export default PatientAction;
import Types from '../../Actions'

const initialState = {
    patitentInfo: {
        loading: false,
        data: {
            username: '',
        }
    },
}

// const reducer = (state = initialState, action)
const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
            case Types.GET_PATITENT:
                return {
                    ...state,
                    patitentInfo: {
                        ...state.patitentInfo, // 작성 안하면 기존 state 날라감;
                        loading: true,
                    }
                }

            case Types.GET_PATITENT_SUCCESS:
                return {
                    ...state,
                    patitentInfo: {
                        ...state.patitentInfo,
                        loading: false,  // 로딩 종료, false
                        data: payload // payload : 액션에서 넘어온 데이터
                    }
                }

                case Types.GET_PATITENT_FAILURE:
                    return {
                        ...state,
                        patitentInfo: {
                            ...state.patitentInfo,
                            loading: false,
                            data: {
                                error: payload // 스프레드가 없어서 상태가 다 날라감
                            }
                        }
                    }
            
        default:
            return state;
    }
}

export default reducer;
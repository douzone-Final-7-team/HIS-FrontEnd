







// // state관리를 위함
// import thunk from 'redux-thunk'
// import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
// import logger from 'redux-logger'; 
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { PatientInfo } from './modules';

// // import { persistReducer } from "redux-persist"; // 추가
// import storage from "redux-persist/lib/storage"; // 추가

// const middlewares = [thunk]; // 전

// export const persistConfig = {
//     key: "root",
//     // localStorage에 저장합니다.
//     storage,
//     // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
//     whitelist: ["auth"]
//     // blacklist -> 그것만 제외합니다
//   };

// // 리듀서 합치기
// const reducers = combineReducers({
//     PatientInfo
// }); 

// let store; // 전

// // 개발환경일때만 적용되는것들
// if (process.env.NODE_ENV === 'development') {
//     middlewares.push(logger);

//     // 스토어 구성을 할때 WidthDevTools에 합친다. 개발환경 
//     store = createStore(
//         reducers,
//         composeWithDevTools(applyMiddleware(...middlewares))
//     )
// } else {
//     store = createStore(
//         reducers,
//         compose(applyMiddleware(...middlewares))
//     ) // 배포환경
// }

// export default store; // 전
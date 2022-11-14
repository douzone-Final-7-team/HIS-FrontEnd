import React from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import { find } from './slice';

// search 컴포넌트
const Search = () => {
  const onEnter = (e) => {
    if (e.key === 'Enter'){
      dispatch(find(inputValue));
    }
  }
  let inputValue;
  const dispatch = useDispatch();
  const search = useSelector(state => {
    console.log(state); // state를 출력하면 store의 내부 리듀서(search)가 최상위 객체로 뜸
    return state.search.value;
  })
  return (
    <div>
      <input onChange={(e)=>{
        inputValue = e.target.value;
        // console.log(inputValue)
      }} onKeyUp={{onEnter}}/> 
      
      <p>{search}</p>
    </div>
  );
}

const index = () => {
  return (
    <Provider store={store}>
      <div>
        <Search />
      </div>
    </Provider>
  )
}

export default index;
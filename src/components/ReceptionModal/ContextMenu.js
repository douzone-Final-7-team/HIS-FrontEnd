import React from 'react'
// style
import './contextMenu.scss';

const ContextMenu = () => {
  return (
    <div className='menu-wrapper'>
      <ul className='contextmenu'>
        <li><a href="#!">대기</a></li>
        <li><a href="#!">진찰</a></li>
        <li><a href="#!">치료</a></li>
        <li><a href="#!">접수취소</a></li>
      </ul>
    </div>
  )
}

export default ContextMenu;

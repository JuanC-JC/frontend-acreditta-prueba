import React from 'react';
import '../../styles/modalMenu.scss';
import close from '../../static/icons/close.svg'

export default function ModalMenu (props) {

  const {isOpen, toggleMenu} = props

    return (
      <>
        <div className={`menuModal ${isOpen && 'menuModal--open'}`}>
          
          <img className='menuModal__closeIcon' onClick={toggleMenu}  src={close} alt="" />

          {props.children}

          <span onClick={toggleMenu}></span>

        </div>
      </>
);
};
import React from 'react';
import ModalMenu from './ModalMenu';

import Menu from '../Menu';

export default function FilterMenu ({isOpen, toggleMenu}) {

    return (
      <ModalMenu isOpen={isOpen} toggleMenu={toggleMenu}>
        
        <Menu toggleMenu={toggleMenu}/>

      </ModalMenu>

);
};
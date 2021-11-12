import React, { useState } from 'react';
import menuBurger from '../static/icons/menuBurguer.svg'

import '../styles/header.scss'
import FilterMenu from './menus/FilterMenu';

export default function Header () {

  const [isOpenMenu,setIsOpenMenu] = useState(false)


  const toggleMenu = () =>{
    setIsOpenMenu(!isOpenMenu)

    document.querySelector('#root').classList.toggle('blurred')
  }

    return (
    <div className='header'>
      <h1>HeroAPI</h1>
      <img onClick={toggleMenu} className='header__menuBurguer' src={menuBurger} alt="" />

      <FilterMenu isOpen={isOpenMenu} toggleMenu={toggleMenu}/>

    </div>
);
};
import React, { useState } from 'react';
import logo from '../static/icons/logo.png'
import menuBurger from '../static/icons/menuBurguer.png'
import Menu from './Menu';

import '../styles/header.scss'
import FilterMenu from './menus/FilterMenu';

export default function Header () {

  const [isOpenMenu,setIsOpenMenu] = useState(false)


  const toggleMenu = () =>{
    setIsOpenMenu(!isOpenMenu)
  }

    return (
    <div className='header'>
      <h1>HeroAPI</h1>
      <img onClick={toggleMenu} className='header__menuBurguer' src={menuBurger} alt="" />

      <FilterMenu isOpen={isOpenMenu} toggleMenu={toggleMenu}/>
      <Menu/>

    </div>
);
};
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../styles/menu.scss'
import Search from './Search';
import SubMenu from './menus/subMenu';

function Menu (props) {

  const {powerstatsOptions,filters,setSortOption,setFilterData,toggleMenu,appearanceOptions} = props

  const [powerOption, setPowerOption] = useState('')

  const [openOrderBlock,setOpenOrderBlock] = useState(false)
  const [openFilterBlock,setOpenFilterBlock] = useState(false)

  const handlePowerOption = (e) =>{
    toggleMenu()
    setPowerOption(e.target.getAttribute('name'))
    setSortOption({
      name:e.target.getAttribute('name'),
      type:'desc'
    })
    setFilterData()
    
  }

  const toggleOption = ()=>{
    setOpenOrderBlock(!openOrderBlock)
  }

  const toogleFilter = () =>{
    setOpenFilterBlock(!openFilterBlock)
  }

    return (
      <div className='menu'>

        <Search />

        <div className={`menu__optionBlock ${openOrderBlock ? 'menu__optionBlock--open' : ''}`}>

          <div className='menu__title' >
            <div onClick={toggleOption} className="menu__titleText">Ordenamiento</div>
            <div className="menu__buttonOrderOption">X</div>
          </div>
          

          <div  className="menu__infoOptionBlock">
            <ul>
              {
                powerstatsOptions.map((option,index)=>{
                  return(
                    <li key={`${option}_${index}`} >
                      <div 
                        name={option} 
                        onClick={handlePowerOption}
                        className={`menu__powerstatOption button ${option === powerOption ? 'button--selected' : ''}`}>
                      {option}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
            

        <div className={`menu__optionBlock ${openFilterBlock ? 'menu__optionBlock--open' : ''}`}>
          <div className='menu__title' >
            <div onClick={toogleFilter} className="menu__titleText">Filtros</div>
          </div>

          <div className="menu__infoOptionBlock">
              {
                Object.entries(appearanceOptions).map(stat=>{
                  return(
                    <SubMenu title={stat[0]} elements={stat[1]}/>
                  )
                })
              }
          </div>
        </div>
      </div>
)};



const mapStateToProps = (state)=>{
  return({
    powerstatsOptions : state.powerstatsOptions,
    appearanceOptions : state.appearanceOptions,
    filters: state.filters
  })
} 

export default connect(mapStateToProps,actions)(Menu)



//APLICAR LOS FILTROS
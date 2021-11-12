import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../styles/menu.scss'
import Search from './Search';
import SubMenu from './menus/subMenu';

import iconSortAsc from '../static/icons/sortAsc.svg'
import iconSortDesc from '../static/icons/sortDesc.svg'

function Menu (props) {

  const {filters,powerstatsOptions,setSortOption,applyFilterData,toggleMenu,appearanceOptions} = props

  const [powerOption, setPowerOption] = useState('')

  const [openOrderBlock,setOpenOrderBlock] = useState(false)
  const [openFilterBlock,setOpenFilterBlock] = useState(false)


  const handlePowerOption = (e) =>{
    
    if(typeof toggleMenu === 'function'){
      toggleMenu()
    }

    const nameOption = e.target.getAttribute('name')


    if(nameOption === powerOption){
      setPowerOption('')
      setSortOption({
        name: '',
      })
    }else{
      setPowerOption(nameOption)
      setSortOption({
        name: nameOption,
      })
    }
    applyFilterData()
    
  }

  const toggleOption = ()=>{
    setOpenOrderBlock(!openOrderBlock)
  }

  const toogleFilter = () =>{
    setOpenFilterBlock(!openFilterBlock)
  }

  const toggleTypeOrder = () =>{

    if(typeof toggleMenu === 'function'){
      toggleMenu()
    }

    setSortOption({
      type: filters.orderOption.type === 'desc' ? 'asc' : 'desc'
    })  

    applyFilterData()
  }

    return (
      <div className='menu'>

        <Search />
        
        <div onClick={toggleTypeOrder} className="menu__orderButton">
          {filters.orderOption.type === 'desc' ? 'Descendente' : 'Ascendente'}
          <img 
                alt='' 
                src={filters.orderOption.type === 'desc' ? iconSortDesc : iconSortAsc} 
                className="menu__buttonOrderOption"

          />
        </div>

        <div className={`menu__optionBlock ${openOrderBlock ? 'menu__optionBlock--open' : ''}`}>
        
          <div onClick={toggleOption}  className='menu__title' >
            <div className="menu__titleText">Ordenamiento</div>
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
          <div onClick={toogleFilter} className='menu__title' >
            <div  className="menu__titleText">Filtros</div>
          </div>

          <div className="menu__infoOptionBlock">
              {
                Object.entries(appearanceOptions).map((stat,index)=>{
                  return(
                    <SubMenu key={index} title={stat[0]} elements={stat[1]}/>
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

const mapDispatchToProps = {
  setSortOption : actions.setSortOption
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu)
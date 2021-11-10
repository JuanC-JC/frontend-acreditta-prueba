import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../styles/menu.scss'
import Search from './Search';

function Menu (props) {

  const {powerstatsOptions,filters,setFilterOption,setFilterData,toggleMenu} = props

  const [powerOption, setPowerOption] = useState('')

  const handlePowerOption = (e) =>{
    toggleMenu()
    setPowerOption(e.target.getAttribute('name'))
    setFilterOption({
      name:e.target.getAttribute('name'),
      type:'desc'
    })
    setFilterData()
    
  }

    return (
      <div className='menu'>

        Busqueda
        <Search />

        <div className="menu__powerstatsOptions">
          Ordenamiento
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


        {/* <div className="filtros">Filtro</div> */}
      </div>
)};



const mapStateToProps = (state)=>{
  return({
    powerstatsOptions : state.powerstatsOptions,
    filters: state.filters
  })
} 

export default connect(mapStateToProps,actions)(Menu)



//APLICAR LOS FILTROS
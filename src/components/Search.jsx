import React, {useState} from 'react';
import { connect } from 'react-redux';
import '../styles/search.scss'
import * as actions from '../actions'
import searchIcon from '../static/icons/search.svg'

function Search ({setSearchOption,applyFilterData}) {

  const [searchState,setSearchState] = useState('')

  const handlePressKey = (e) =>{
    if(e.key === 'Enter'){ 
      setSearchOption(searchState)
      applyFilterData()
    }
  }

  const handleSubmitSearch = ()=>{
    setSearchOption(searchState)
    applyFilterData()
  }

  const handleChange = (e)=>{
    setSearchState(e.target.value)
  }

    return (
      <div className='search'>
        <img className='search__button' onClick={handleSubmitSearch} src={searchIcon} alt="" />
        {/* <button  >Send</button> */}
        <input onKeyPress={handlePressKey} value={searchState} onChange={handleChange} placeholder="Search" type="text" />
      </div>
)};


export default connect(null,actions)(Search)
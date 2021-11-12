import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'

function SubMenu (props) {

  const {handleClick,title,elements,setFilterOption,applyFilterData} = props

  const [isOpen,setIsOpen] = useState(false)

  const handleOpen = () =>{
    setIsOpen(!isOpen)
  }

  const handleInput = (key,value,checked)=>{

    const filterOpt = {type:key,value,checked}

    setFilterOption(filterOpt)
    
    applyFilterData()
  }

    return (
    <div className={`menu__subBlock ${isOpen ? 'menu__subBlock--open' : ''}`}>
      <div onClick={handleOpen}  className="menu__title">{title}</div>

      <div className="menu__infoOptionBlock">
        {
          elements.map((opt,index)=>(

            <label className='checkBox' style={{display:'block'}}>
              <input onChange={(e)=>handleInput(title,opt,e.target.checked)} name={opt} type="checkbox" value={opt} />
              <span>{opt}</span>
            </label>
          ))
        }
      </div>
    </div>
);
};


export default connect(null,actions)(SubMenu)


//para cada elemento de la lista
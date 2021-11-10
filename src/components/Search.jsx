import React from 'react';
import '../styles/search.scss'

export default function Search ({handler}) {
  
    return (
    <div className='search'>
      <button onClick={handler} >Send</button>
      <input placeholder="Search" type="text" />
    </div>
);
};
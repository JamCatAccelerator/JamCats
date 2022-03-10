import React, { useState } from 'react'
import SearchContainer from './SearchContainer.jsx';

const ActiveJamSessionContainer = (props) => {
  return (
    <div id="active-jam-session">
        <h1>{props.currentJamSession}</h1>
        <SearchContainer/>
        <button className="button is-light" onClick={()=>{props.deactivateJamSession()}}>DEACTIVATE</button>
    </div>  
  )
}

export default ActiveJamSessionContainer
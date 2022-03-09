import React, { useState } from 'react'
import SearchBar from '../components/SearchBar.jsx';
import SearchResult from '../components/SearchResult.jsx';


const ActiveJamSessionContainer = (props) => {
  return (
    <div>
        <h1>{props.currentJamSession}</h1>
        <SearchBar/>
        <button className="button is-light" onClick={()=>{props.deactivateJamSession()}}>DEACTIVATE</button>
    </div>  
  )
}

export default ActiveJamSessionContainer
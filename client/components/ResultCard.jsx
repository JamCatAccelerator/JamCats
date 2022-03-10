import React from 'react'

const ResultCard = props =>{
    return(
    <div className="search-result" onClick={()=>{console.log("ADDED TO PLAYLIST")}}>
        <span>
            <img src ={props.song.albumCover} alt = {props.song.name}/> {props.song.name} - {props.song.artist} 
        </span>
    </div>
    )
}
export default ResultCard
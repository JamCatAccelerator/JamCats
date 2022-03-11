import React, { useState, Component } from 'react'
import SearchContainer from './SearchContainer.jsx';
import JamSession from '../components/JamSession.jsx';

class ActiveJamSessionContainer extends Component {
  render(){
    const jSessions = [];
    for (let j = 0; j < this.props.playlists.length; j++) {
        if (this.props.playlists[j].id === this.props.currentJamSession) {
            jSessions.push(<JamSession key={`JamSession${j}`} id={j} playlist={this.props.playlists[j]} activateJamSession={this.props.activateJamSession} activated={true}/>)
        }
    }
    return (
      <div id="active-jam-session">
          <SearchContainer/>
          {jSessions}
          <button className="button is-light" onClick={()=>{this.props.deactivateJamSession()}}>DEACTIVATE</button>

      </div>  
    )
  }
}

export default ActiveJamSessionContainer
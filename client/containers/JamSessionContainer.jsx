import React, { useState, useEffect, Component } from 'react'
import JamSession from '../components/JamSession';

// const JamSessionContainer2 = (props) => {
//     // console.log('Jam Sessions Container:', props.jamSessions);
//     const jSessions = [];
//     useEffect( () => {
//         for (let i = 0; i < props.jamSessions.length; i++){
//             jSessions.push(<JamSession id={i} activateJamSession={props.activateJamSession} jamSession={props.jamSessions[i]}/>)
//         }
//         // console.log('jSessions array after insertion');
//         // console.log(jSessions)
//     })
//     // console.log('jSessions array after useEffect');
//     // console.log(jSessions);
//     return (
//         <div id="jam-sessions">
//             <p>hi</p>
//             {jSessions}
//         </div>
//     )
// }

class JamSessionContainer extends Component {
    render() {
        const jSessions = [];
        for (let i = 0; i < this.props.jamSessions.length; i++) {
            for (let j = 0; j < this.props.playlists.length; j++) {
                if (this.props.playlists[j].id === this.props.jamSessions[i].playlistId) {
                    jSessions.push(<JamSession key={`JamSession${i}`} id={i} playlist={this.props.playlists[j]} activateJamSession={this.props.activateJamSession} jamSession={this.props.jamSessions[i]}/>)
                }
            }
        }
        return (
            <div id="jam-sessions" className="columns is-multiline">
                {jSessions}
            </div>
        )
    }
}

export default JamSessionContainer
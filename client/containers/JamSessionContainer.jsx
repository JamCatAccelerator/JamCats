import React, { useState, useEffect, Component } from 'react'
import JamSession from '../components/JamSession';

class JamSessionContainer extends Component {
    render() {
        const jSessions = [];
        for (let i = 0; i < this.props.jamSessions.length; i++) {
            for (let j = 0; j < this.props.playlists.length; j++) {
                if (this.props.playlists[j].id === this.props.jamSessions[i].playlistId) {
                    jSessions.push(<JamSession key={`JamSession${i}`} id={i} playlist={this.props.playlists[j]} activateJamSession={this.props.activateJamSession} jamSession={this.props.jamSessions[i]} activated={false}/>)
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
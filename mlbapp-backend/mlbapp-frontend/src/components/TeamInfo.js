import React, { Component } from 'react';
import logo from './../logo.svg';
import './TeamInfo.css';

import TeamBox from './TeamBox';

class TeamInfo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let teamInfo = this.props.info;
    if(Object.keys(teamInfo).length !== 0){
      return (
        <div className="team-container">
        <div> Abbreviation: {teamInfo.abbreviation} </div>
        <div> Division: {teamInfo.division.name} </div>
        <div> Location: {teamInfo.locationName} </div>
        </div>
      );
    }
    else {
      return <div className="team-container">Click on team to load info!</div>
    }
  }
}

export default TeamInfo;

import React, { Component } from 'react';
import logo from './../logo.svg';
import './TeamInfo.css';

import TeamBox from './TeamBox';
import InfoBox from './InfoBox';

import axios from "axios";

class TeamInfo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let teamInfo = this.props.info;
    let className = "info-container";
    let infoContent = <div className={className} > Click on team to load info! </div>
    if(teamInfo.length > 0){
      infoContent = []
      for (var i = 0; i < teamInfo.length; i++){
        infoContent.push(
          <InfoBox key={teamInfo[i].abbreviation + "-INFO"} info={teamInfo[i]} />
        );
      }
    }
    return <div className="info-container">{infoContent}</div>
  }
}

export default TeamInfo;

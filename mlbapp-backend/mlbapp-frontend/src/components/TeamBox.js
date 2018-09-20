import React, { Component } from 'react';
import logo from './../logo.svg';
import './TeamBox.css';

import axios from "axios";

class TeamBox extends Component {
  constructor(props){
    super(props);
    let team = this.props.team;
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e){
    e.preventDefault();
    let team = this.props.team;
    this.props.handleExpansion({
      "teamAbb": team.abbreviation,
      "teamId": team.teamId
     });
  }

  render(){
    let team = this.props.team;
    let className = "team-box";
    let boxContents = <div> {team.teamName} </div>;
    return (
      <div className={className} onClick={this.handleClick}> {boxContents} </div>
    );
  }
}

export default TeamBox;

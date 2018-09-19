import React, { Component } from 'react';
import logo from './../logo.svg';
import './TeamBox.css';

import axios from "axios";

class TeamBox extends Component {
  constructor(props){
    super(props);
    let team = this.props.team;
    let expandedTeams = this.props.expandedTeams;
    let expanded = false;
    if (expandedTeams.findIndex(expTeam => expTeam === team.teamName) !== -1 ) expanded = true;
    this.state = {
      expanded: expanded,
      teamInfo : null
    };
    if (this.state.expanded) this.getTeamInfo();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps){
    let team = this.props.team;
    let prevTeam = prevProps.team;
    if (team.abbreviation !== prevTeam.abbreviation){
      let expandedTeams = this.props.expandedTeams;
      let expanded = false;
      if (expandedTeams.findIndex(expTeam => expTeam === team.abbreviation) !== -1 ) expanded = true;
      this.setState({
        expanded: expanded,
        teamInfo: null
      });
      if(expanded) this.getTeamInfo();
    }
  }

  getTeamInfo(){
    let team = this.props.team;
    axios.get('/mlbapi/team', {params: {teamId: team.teamId}})
    .then(res => {
      this.setState({
        teamInfo: res.data.teams[0]
      })
    });
  }

  handleClick(e){
    e.preventDefault();
    let team = this.props.team;
    let expanded = this.state.expanded;
    if (expanded) this.props.removeFromExpanded(team.abbreviation);
    else {
      this.props.addToExpanded(team.abbreviation);
      if(!this.state.teamInfo) this.getTeamInfo();
    }
    this.setState({
      expanded: !expanded
    })
  }

  render(){
    let team = this.props.team;
    let expanded = this.state.expanded;
    let className = "team-box";
    let boxContents = [<div> {team.teamName} - {team.abbreviation} </div>];
    let teamInfo = this.state.teamInfo;
    if (expanded) {
      className += " expanded";
      if (teamInfo){
        boxContents.push((<div> Abbreviation: {teamInfo.abbreviation} </div>));
        boxContents.push((<div> Division: {teamInfo.division.name} </div>));
        boxContents.push((<div> Location: {teamInfo.locationName} </div>));
      }
      else boxContents.push((<div> Team Info Loading... </div>));
    }
    return (
      <div className={className} onClick={this.handleClick}> {boxContents} </div>
    );
  }
}

export default TeamBox;

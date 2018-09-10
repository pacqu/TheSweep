import React, { Component } from 'react';
import logo from './../logo.svg';
import './TeamContainer.css';

import TeamBox from './TeamBox';

class TeamContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      expandedTeams: [] //holds team name that is to be expanded
    };
  }

  addToExpanded = (expandedTeam) => {
    let expandedTeams = this.state.expandedTeams;
    expandedTeams.push(expandedTeam);
    this.setState({
      expandedTeams: expandedTeams
    });
  }

  removeFromExpanded = (deletedTeam) => {
    let expandedTeams = this.state.expandedTeams;
    let deletedIndex = expandedTeams.findIndex(team => team === deletedTeam);
    if (deletedIndex !== -1) expandedTeams.splice(deletedIndex, 1);
    this.setState({
      expandedTeams: expandedTeams
    });
  }
  render(){
    let teams = this.props.teams;
    let expandedTeams = this.state.expandedTeams;
    let teamDivs = teams.map( (team) => {
      return <TeamBox key={team.abbreviation}
      team={team}
      expandedTeams={expandedTeams}
      addToExpanded={this.addToExpanded}
      removeFromExpanded={this.removeFromExpanded}/>;
    })
    return (
      <div className="team-container"> {teamDivs} </div>
    );
  }
}

export default TeamContainer;

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

  handleExpansion = (expandedTeam => {
    let expandedTeams = this.state.expandedTeams;
    let deletedIndex = expandedTeams.findIndex(team => team.id === expandedTeam.id);
    if (deletedIndex !== -1) expandedTeams.splice(deletedIndex, 1);
    else expandedTeams.push(expandedTeam);
    this.setState({
      expandedTeams: expandedTeams
    });
    this.props.getExpandedTeams(expandedTeams);
  })


  render(){
    let teams = this.props.teams;
    let expandedTeams = this.state.expandedTeams;
    let teamDivs = teams.map( (team) => {
      return <TeamBox key={team.abbreviation}
      team={team}
      handleExpansion={this.handleExpansion}/>;
    })
    return (
      <div className="team-container"> {teamDivs} </div>
    );
  }
}

export default TeamContainer;

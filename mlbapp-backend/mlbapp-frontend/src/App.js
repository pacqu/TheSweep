import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      teamsLoaded: false,
      selectedTeamId: 0,
      searchedForTeam: "",
      teams: []
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount(){
    axios.get('/mlbapi/teams')
    .then(res => {
      this.setState({
        teams: res.data
      });
      console.log(res.data);
    })
    .then(() => {
      this.setState({
        teamsLoaded: true
      });
    });
  }

  handleSearchChange(event){
    let searchedForTeam = event.target.value;
    this.setState({
      searchedForTeam: searchedForTeam
    });
    console.log(this.state.searchedForTeam);
  }

  render() {
    let teamsLoaded = this.state.teamsLoaded;
    let teams = this.state.teams;
    let searchedForTeam = this.state.searchedForTeam;
    let teamsDivs = <div> Loading Teams </div>;
    if (teamsLoaded){
      if (searchedForTeam.length > 0){
        teams = teams.filter(team =>
          team.teamName.toLowerCase().includes(searchedForTeam.toLowerCase())
        );
      }
      teamsDivs = teams.map( (team, i) => (
        <div key={i}>
          {team.teamName} - {team.teamId}
        </div>
      ));
  }
    return (
      <div className="App">
        <div className="Container">
          <h1> MLBapp</h1>
          <input
            className="team-search"
            name="searchedForTeam"
            ref="searchedForTeam"
            type="text"
            placeholder="Search Team Name"
            onChange={this.handleSearchChange}
            />
          <h3>{searchedForTeam}</h3>
          {teamsDivs}
        </div>
      </div>
    );
  }
}

export default App;

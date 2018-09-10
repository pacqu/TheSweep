import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TeamContainer from './components/TeamContainer';

import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      teamsLoaded: false,
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
    let teamsContainer = <div> Loading Teams </div>;
    if (teamsLoaded){
      if (searchedForTeam.length > 0){
        teams = teams.filter(team =>
          team.teamName.toLowerCase().includes(searchedForTeam.toLowerCase())
        );
      }
      teamsContainer = <TeamContainer teams={teams} />;
    }
    return (
      <div className="App">
        <div className="Container">
          <img id="mlb-logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Major_League_Baseball_logo.svg/1200px-Major_League_Baseball_logo.svg.png" />
          <input
            className="team-search"
            name="searchedForTeam"
            ref="searchedForTeam"
            type="text"
            placeholder="Search Team Name"
            onChange={this.handleSearchChange}
            />
          {/*
            - Make TeamDisplay Component for each team
            - List out teams, each in own div
            - Click div to expand/collapse teamsDivs
            - Make container for team comps, be able to scroll through
            */}
            {/* To be replaced by TeamContainer component */}
            {teamsContainer}
        </div>
      </div>
    );
  }
}

export default App;

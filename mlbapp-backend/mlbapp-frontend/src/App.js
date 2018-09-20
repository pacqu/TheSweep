import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TeamContainer from './components/TeamContainer';
import TeamInfo from './components/TeamInfo';

import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      teamsLoaded: false,
      searchedForTeam: "",
      teams: [],
      lastExpanded: "",
      expandedInfo: {}
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

  getLastExpandedTeam = (expandedList) => {
    if(expandedList.length > 0){
      axios.get('/mlbapi/team', {params: {teamId: expandedList[expandedList.length - 1].teamId}})
      .then(res => {
        this.setState({
          lastExpanded: expandedList[expandedList.length - 1],
          expandedInfo: res.data.teams[0]
        });
      });
    }
    else{
      this.setState({
        lastExpanded: {},
        expandedInfo: {}
      });
    }
  }

  render() {
    let teamsLoaded = this.state.teamsLoaded;
    let teams = this.state.teams;

    let searchedForTeam = this.state.searchedForTeam;
    let lastExpanded = this.state.lastExpanded;
    let expandedInfo = this.state.expandedInfo;

    let teamsContainer = <div> Loading Teams </div>;

    let appId = "";
    let contId = "";
    if (lastExpanded){
      appId = lastExpanded.teamAbb + "-app";
      contId = lastExpanded.teamAbb + "-container";
    }

    if (teamsLoaded){
      if (searchedForTeam.length > 0){
        teams = teams.filter(team =>
          team.teamName.toLowerCase().includes(searchedForTeam.toLowerCase())
        );
      }
      teamsContainer = <TeamContainer teams={teams} getLastExpandedTeam={this.getLastExpandedTeam}/>;
    }
    return (
      <div className="App" id={appId}>
        <div className="Container" id={contId}>
          <img id="mlb-logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Major_League_Baseball_logo.svg/1200px-Major_League_Baseball_logo.svg.png" />
          <input
              className="team-search"
              name="searchedForTeam"
              ref="searchedForTeam"
              type="text"
              placeholder="Search Team Name"
              onChange={this.handleSearchChange}
          />
          <div className="infoContainer">
            {/*
              DONE
              - Make TeamDisplay Component for each team
              - List out teams, each in own div
              - Click div to expand/collapse teamsDivs
              - Make container for team comps, be able to scroll through
            */}
            {teamsContainer}
            {/*
                - Make a similarly sized container for team information instead of expanding team divs
                - When no team is selected, only has text saying to select a team
                - If team is selected, will show information on teams
                - If another team is selected while tean is selected, will show info of last chosen team will show
                - If a team is unselected, will show information the next most recently chosen team, if exists.
            */}
            <div><TeamInfo info={expandedInfo} /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

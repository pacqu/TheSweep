import React, { Component } from 'react';
import logo from './../logo.svg';
import './InfoBox.css';

import axios from "axios";
import moment from "moment";
moment().format();

class InfoBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      todaysGame: {}
    }
  }

  getTodaysGame(){
    let info = this.props.info;
    axios.get('/mlbapi/todaysgame', { params: {"teamId": info.id } })
    .then(res =>
      this.setState({
        todaysGame: res.data
      })
      /*
      if (res.data
      this.interval = setInterval( () => {
        if (Object.keys(this.state.todaysGame).length !== 0 && obj.constructor === Object){

        }
      },5000);
      */
    );
  }

  componentDidMount(){
    this.getTodaysGame();
  }

  render(){
    let info = this.props.info;
    let todaysGame = this.state.todaysGame;
    let gameContents = <div> Loading Game Info...</div>;
    let className = "info-box";

    if(Object.keys(todaysGame).length > 0 && todaysGame.dates[0]){
      let displayGame = todaysGame.dates[0].games[0];
      let gameDate = moment(displayGame.gameDate);
      let teams = displayGame.teams
      gameContents = (<div>
        <div>{displayGame.status.detailedState} at {gameDate.format("h:mm A")}</div>
        <div>{teams.away.team.name} ({teams.away.leagueRecord.wins}-{teams.away.leagueRecord.losses}, {teams.away.leagueRecord.pct})</div>
        <div>@</div>
        <div>{teams.home.team.name} ({teams.home.leagueRecord.wins}-{teams.home.leagueRecord.losses}, {teams.home.leagueRecord.pct})</div>
      </div>);
    }
    else gameContents = <div>No Game Today :(</div>;
    let boxContents = (
      <div>
      <h4> {info.name} </h4>
      <div> Abbreviation: {info.abbreviation} </div>
      <div> Division: {info.division.name} </div>
      <div> Location: {info.locationName} </div>
      <div> Venue: {info.venue.name} </div>
      <h5>Today's Game</h5>
      {gameContents}
      </div>
    );
    return (
      <div className={className} onClick={this.handleClick}> {boxContents} </div>
    );
  }
}

export default InfoBox;

var express = require('express');
var axios = require('axios');
var moment = require('moment');
var router = express.Router();


const BASE_URL = "http://statsapi.mlb.com/api/v1/";
const SCHEDULE_START_DATE = "03/29/2018";
const SCHEDULE_END_DATE = "09/30/2018";
const TODAYS_DATE = moment().format("MM/DD/YYYY");

/* GET all MLB teams */
router.get('/teams', function(req, res, next) {
  let teamParams = {
    "sportId": "1",
  };
  axios.get(BASE_URL + "teams/", {
    params: teamParams
  }).then(result => {
    res.json(result.data.teams);
  });
});

/* GET a single MLB Team --> Default will be Yankees */
router.get('/team', function(req, res, next) {
  let teamParams = Object.assign({
    "sportId": "1",
    "teamId": "147",
  }, req.query);
  axios.get(BASE_URL + "teams/", {
    params: teamParams
  }).then(result => {
    res.json(result.data);
  });
});

/* GET Today's Game Listing. */
router.get('/todaysgame', function(req, res, next) {
  console.log(req.query);
  let gameParams = Object.assign({
    "teamId": "147",
    "sportId": "1",
    "startDate": TODAYS_DATE,
    "endDate": TODAYS_DATE
  }, req.query);
  console.log(gameParams);
  axios.get(BASE_URL + "schedule/", { params: gameParams })
  .then(result => {
    console.log(result.data);
    res.json(result.data);
  });
});

/* GET Game's Line-Score. */
router.get('/linescore/:gameId', function(req, res, next) {
  console.log(req.params);
  axios.get(BASE_URL + `game/${req.params.gameId}/linescore`)
  .then(result => {
    console.log(result.data);
    res.json(result.data);
  });
});

module.exports = router;

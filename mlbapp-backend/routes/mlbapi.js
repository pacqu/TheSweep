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
  axios.get(BASE_URL + "teams/", {
    params: {
      "sportId": "1",
    }
  }).then(result => {
    console.log(result.data);
    res.json(result.data);
  });
});

/* POST */
/* GET Today's Game Listing. */
router.get('/todaysgame', function(req, res, next) {
  axios.get(BASE_URL + "schedule/", {
    params: {
      "teamId": "147",
      "sportId": "1",
      "startDate": TODAYS_DATE,
      "endDate": TODAYS_DATE
    }
  }).then(result => {
    console.log(result.data);
    res.json(result.data);
  });
});

module.exports = router;

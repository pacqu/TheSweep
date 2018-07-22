var express = require('express');
var axios = require('axios');
var moment = require('moment');
var router = express.Router();


const BASE_URL = "http://statsapi.mlb.com/api/v1/";
const SCHEDULE_START_DATE = "03/29/2018";
const SCHEDULE_END_DATE = "09/30/2018";
const TODAYS_DATE = moment().format("MM/DD/YYYY");

/* GET users listing. */
router.get('/', function(req, res, next) {
  axios.get(BASE_URL + "schedule/", {
    params: {
      "teamId": "147",
      "sportId": "1",
      "startDate": TODAYS_DATE,
      "endDate": TODAYS_DATE
    }
  }).then(res => {
    console.log(res.data);
  });
});

module.exports = router;

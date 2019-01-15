var express = require('express');
var router = express.Router();
const NBA = require("nba");

/* GET home page. */
router.get('/', function(req, res, next) {
  NBA.data.scoreboard('20181008').then(data => {
    res.json(data);
  })
  /*const teamId = 1610612752;
  NBA.stats.teamInfoCommon({TeamID: teamId})
  .then(data => {
    res.json(data);
  });
  const zinger = NBA.findPlayer('Kristaps Porzingis');
  console.log(zinger);
  NBA.stats.playerSplits({ PlayerID: zinger.playerId, Season: "2017-18" })
  .then(data => {
    res.json(data);
  });*/
});

module.exports = router;

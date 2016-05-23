
var express = require('express');
var fs = require('fs');
var router = express.Router();
var player = require('../player');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
    res.json(player.getStatus());
//    res.json({a:'b'});
    
});

router.get('/play', function(req, res, next) {
    player.play();
    res.send();
});

router.get('/pause', function(req, res, next) {
    player.pause();
    res.send();
});

router.get('/stop', function(req, res, next) {
    player.stop();
    res.send();
});

module.exports = router;

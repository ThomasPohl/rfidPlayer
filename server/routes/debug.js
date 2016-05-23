var express = require('express');
var router = express.Router();
var db = require('../database');


/* GET home page. */
router.get('/database/models', function(req, res, next) {

    var Tag = db.Tag;
    new Tag().collection.drop();
    res.send('OK');    
});

module.exports = router;
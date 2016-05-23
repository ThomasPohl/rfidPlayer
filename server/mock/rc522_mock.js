var callback;



var express = require('express');
var router = express.Router();

/* GET tags listing. */
router.get('/', function(req, res, next) {
    //res.statusCode = 200;
  res.json(req.query.id);
  var id = String(req.query.id);
  if (callback !== undefined){
    callback(id);
  }
});

module.exports = {
    r:router,
    setCallback:function(c){
        callback=c;
    }
};
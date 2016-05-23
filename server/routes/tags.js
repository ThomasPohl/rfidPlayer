var express = require('express');
var player = require('../player');

var router = express.Router();
var rfid = null;
var rc522 = require('rc522');
var assocMode = false;
var timeoutHandle = undefined;
var lastRfid = null;

rc522(function(rfidSerialNumber){
    console.log('ID:'+rfidSerialNumber);
    if (assocMode){
        rfid = rfidSerialNumber;
        assocMode=false;
    } else {
        if (rfidSerialNumber==='') {
            player.pause();
        } else if (rfidSerialNumber === lastRfid){
            player.play();
        } else { 
            Tag.find({hwid:rfidSerialNumber}, function(err,tags) {
                if (tags.length==1){
                    console.log("Play:"+tags);
                    player.setCurrent(tags[0]);
                }       
            });
            
            lastRfid=rfidSerialNumber;
        }
    }
});

db = require('../database');
var Tag = db.Tag;

/* GET tags listing. */
router.get('/', function(req, res, next) {
    //TODO access db
    //var tags = [{title:'TEST title', album:'Album-name', tagId:'123456789', artist:rfid}];
    //res.send(tags);
            console.log('finding');
            Tag.find({},function(err, tags) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                console.log(err);
                throw err;
            }else {
                console.log('found');
                console.log(tags);
            }

            res.json(tags); // return all todos in JSON format
        });

});

router.post('/', function(req, res, next){
        if (req.body.artist === undefined){
            res.status(400);
            res.send('No artist found in request');
        }else {
            //Update
                console.log('Updating');
                console.log(req.body);
                var doc = {
                    hwid : req.body.hwId,
                    artist : req.body.artist,
                    album : req.body.album,
                    title : req.body.title
                }; 
                console.log('New doc:');
                console.log(doc);
                Tag.create(doc, function(err){
                    if (err){
                        console.log(err);
                        Tag.update({hwid:doc.hwid}, doc, function(err){
                            if (err) throw err;    
                            console.log('updated');
                        });
                    }else {
                        console.log('created');
                    }
                });
        } 
        // get and return all the tag after you create another
        Tag.find(function(err, tags) {
            if (err){
                console.error('err');
                res.send(err);
            }
            res.json(tags);
        });
                
});

router.delete('/:id', function(req, res, next){
        Tag.remove({
            _id : req.params.id
        }, function(err, tag) {
            if (err)
                res.send(err);

            // get and return all the tag after you create another
            Tag.find(function(err, tags) {
                if (err)
                    res.send(err)
                res.json(tags);
            });
        });
});

router.get('/startAssocMode', function(req,res, next){
    assocMode = true;
    rfid = null;
    if (timeoutHandle!==undefined){
        clearTimeout(timeoutHandle);
        timeoutHandle=undefined;
    }
    timeoutHandle=setTimeout(function(){assocMode=false;},10000);
    res.send('OK');
});

router.get('/getLastTagId', function(req,res, next){
    if (rfid===null && !assocMode){
        res.status(408);
        res.send('Timeout');
    }else if(rfid===undefined || rfid===null){ 
        res.status(404);
        res.send();
    }else{
        res.send({id:rfid});
    }
});

module.exports = router;

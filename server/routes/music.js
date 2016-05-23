var express = require('express');
var fs = require('fs');
var router = express.Router();
var mm = require('musicmetadata');
var sqlite3 = require('sqlite3');
var cfg=require('../config');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
var sdb = new sqlite3.Database(cfg.xmms2.db, sqlite3.OPEN_READONLY);

var directory = '../music/';

//require database
var db = require('../database')
var Music = db.Music;


router.get('/', function(req,res,next){
    var result = [];
    sdb.serialize(function() {
        sdb.each("select title.value as titleV, artist.value as artistV ,album.value as albumV from media as title JOIN media as artist JOIN media as album where title.id=artist.id and title.id=album.id and title.key = \"title\" and artist.key= \"artist\" and album.key=\"album\" and artist.source=5 and title.source=5 and album.source=5", function(err, row) {
            result.push({
                title:row.titleV,
                artist:row.artistV,
                album:row.albumV
            });
            console.log(row.titleV + ": " + row.artistV);
        }, function(){
            res.send(result);
        });
 
    });
});

/*
function isMp3(fileName){
    return fileName.indexOf('.mp3', fileName.length - 4 !== 1);
}
router.get('/old', function(req, res, next) {
    var files = fs.readdirSync(directory).filter(isMp3);
    var result = [];
    var started=0;
    function allDone(){
        console.log('All done');
        Music.find({},function(err,musicData){
            if (err) throw err;
            console.log(musicData);
            res.send(musicData);
        });
    }
    var parseId3 = function(file){
        console.log('Parsing '+ file);
            var parser = mm(fs.createReadStream(directory+file), function (err, metadata) {
                if (err) throw err;
                var newMusic = {
                    filename:file,
                    artist:metadata.artist,
                    album:metadata.album,
                    title:metadata.title,
                    image:metadata.picture[0].data,
                    lastUpdate: Date.now()
                };
                Music.update(newMusic, {upsert:true},function(err){
                        if (err) throw err;
                        //console.log(newMusic);
                        started--;
                        if (started===0){
                            allDone();
                        }
                });
            });
    }
    files.forEach(function(file) {
        started++;
        Music.find({filename:file}, function(err,musicData){
            if (err) throw err;
            if (musicData.length>0){
                if (musicData[0].lastUpdate+10*60*1000<Date.now()){
                    console.log('too old:'+file);
                    parseId3(file);
                }else {
                    started--;
                    if (started===0){
                        allDone();
                    }
                }
            }else {
                console.log('New file:'+file);
               parseId3(file);
            }
        });
    });
    
});
*/
module.exports = router;

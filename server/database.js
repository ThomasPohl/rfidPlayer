var mongoose       = require('mongoose');                     // mongoose for mongodb
var cfg            = require('./config');

mongoose.connect('mongodb://'+cfg.mongo.user+':'+cfg.mongo.pwd+'@'+cfg.mongo.host+':27017/'+cfg.mongo.db);     // connect to mongoDB database on modulus.io

// define model =================
    var Music = mongoose.model('Music', {
        filename : {type:String, unique:true},
        artist : String,
        album : String,
        title : String,
        image : Buffer,
        lastUpdate: Number
        
    });
 

// define model =================
    var tagSchema = new mongoose.Schema({
        hwid : {type:String, unique:true},
        artist : String,
        album : String,
        title : String
        
    });
    var RfidTag = mongoose.model('RfidTag', tagSchema);
 
module.exports = {Music:Music, Tag:RfidTag, mongoose:mongoose};

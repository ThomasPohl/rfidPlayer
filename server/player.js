var child_process = require('child_process');
var exec = child_process.exec;
var execSync = child_process.execSync;

function xmms2(cmds){
    var cmd = 'sudo -u pi xmms2 ' + cmds.pop();
    
    if (cmds.length>0){
        exec(cmd, function (error, stdout, stderr){
            xmms2(cmds);
        })
    } else {
        exec(cmd);
    }
}

var exp = {};
exp.setCurrent = function(data){
    xmms2(['stop', 'clear', 'add artist:"'+data.artist+'" title:"'+data.title+'"', 'play']);
};

exp.play = function(){ xmms2(['play']); };

exp.pause = function(){ xmms2(['pause']); };

exp.stop = function(){ xmms2(['stop']); };

exp.next = function(){ xmms2(['next']); };

exp.prev = function(){ xmms2(['prev']); };

function timeToSec(time) {
    var colon = time.indexOf(':');
    var minutes  = time.slice(0,colon);
    var seconds = time.slice(colon+1);
    return Number(minutes)*60 + Number(seconds);
}


exp.getStatus = function(){
    var response = {};
    var current = String(execSync('sudo -u pi xmms2 current'));
    response.info = String(execSync('sudo -u pi xmms2 info')).match(/[^\r\n]+/g);;
    var colon = current.indexOf(':');
    response.status = current.slice(0,colon);
    if (response.status==='Playing'){
        var lastColon = current.lastIndexOf(':',current.lastIndexOf(':',current.lastIndexOf(':')-1)-1);
        var timer = current.slice(lastColon+1);
        var ofPos = timer.indexOf(' of ');
        response.pos = timeToSec(timer.slice(0,ofPos));
        response.duration = timeToSec(timer.slice(ofPos+4,timer.length-1));
    }
    var rest = current.slice(colon);
    console.log(rest);
    return (response);
}

module.exports = exp;

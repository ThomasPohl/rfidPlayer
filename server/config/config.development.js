var config = require('./config.global');

config.env = 'development';
config.mongo.db = 'rfidPlayer';
config.mongo.host = '192.168.0.37';
config.mongo.user = 'rfidPlayer';
config.mongo.pwd = 'rfidPlayer';

config.xmms2.db = process.env['USERPROFILE']+'/.config/xmms2/medialib.db';

module.exports = config;

var config = require('./config.global');

config.env = 'production';
config.mongo.db = 'rfidPlayer';
config.mongo.host = '127.0.0.1';
config.mongo.user = 'rfidPlayer';
config.mongo.pwd = 'rfidPlayer';

config.port=80;

config.xmms2.db = '/home/pi/.config/xmms2/medialib.db';

module.exports = config;



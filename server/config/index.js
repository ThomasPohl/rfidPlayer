var env = process.env.NODE_ENV || 'test'
  , cfg = require('./config.'+env);
 
module.exports = cfg;
var cloud = require('node-cloud');
var fs = require('fs');

var exports = {};
var cloud_options = {
  flavor_prefix: '',
  image_prefix: '',
  server_prefix: ''
};

var loadConfig = function (file) {
  try {
    var configFile = file;
    var stats = fs.statSync(configFile);
    var config = JSON.parse(fs.readFileSync(configFile).toString());

    return config || {};
  }
  catch (ex) {
    console.log('Error parsing '+config);
    ex.stack.split('\n').forEach(function (line) {
      console.log(line);
    });
    process.exit(1);
  }
};

exports.init = function(config, callback) {
  if (!config) {
    return callback(new Error('No config file specified.  See -h for assistance'));
  }
  config = loadConfig(config);
  cloud.init(config, cloud_options, function(err) {
    if (err) {
      return callback(err);
    }
    else {
      callback(null, cloud);
    }
  });
};

module.exports = exports;
var cloud = require('pkgcloud');
var fs = require('fs');
var table = require('cli-table');
var dateformat = require('dateformat');

var exports = {};

var client;

var CLIENT_TYPES = {
  'compute'  : 'COMPUTE',
  'database' : 'DATABASE',
  'storage'  : 'STORAGE',
  'dns'      : 'DNS',
  'network'  : 'NETWORK'
};

exports.CLIENT_TYPES = CLIENT_TYPES;

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

exports.init = function(config, type, callback) {
  if (!config) {
    return callback(new Error('No config file specified.  See -h for assistance'));
  }
  config = loadConfig(config);
  if (type === CLIENT_TYPES.compute) {
    client = cloud.compute.createClient(config.compute[0]);
  }
  else if (type === CLIENT_TYPES.dns) {
     client = cloud.dns.createClient(config.dns[0]);
  }
  else if (type === CLIENT_TYPES.network) {
    client = cloud.network.createClient(config.network[0]);
  }
  if (type === CLIENT_TYPES.storage) {
    client = cloud.storage.createClient(config.storage[0]);
  }
  return callback(null, client);
};

exports.outputImages = function(err, images) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  var tbl = new table({
    head: ['ID', 'NAME', 'CREATED', 'UPDATED', 'STATUS', 'PROGRESS'],
    colWidths: [40, 50, 22, 22, 10, 10]
  });
  for (var iter in images) {
    var img = images[iter];
    var data = [
      img.id,
      img.name,
      dateformat(img.created, 'yyyy-mm-dd h:MM:ss') || 'N/A',
      dateformat(img.update, 'yyyy-mm-dd h:MM:ss') || 'N/A',
      img.status || 'N/A',
      img.progress|| 'N/A'
    ];
    tbl.push(data);
  }
  console.log(tbl.toString());
};

exports.getNetworkTableDefinition = function() {
 return {
    head: ['ID', 'Tenant ID', 'NAME', 'Status', 'Up', 'Shared'],
    colWidths: [40, 40, 30, 10, 10, 10]
  };
};

exports.getNetworkRow = function(network) {
  return  [
      network.id,
      network.tenantId || 'N/A',
      network.name || 'N/A',
      network.status || 'N/A',
      network.adminStateUp || 'N/A',
      network.shared || 'N/A'];
};

module.exports = exports;

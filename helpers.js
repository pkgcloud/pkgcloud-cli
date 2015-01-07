var cloud = require('pkgcloud');
var fs = require('fs');
var osenv = require('osenv');
var table = require('cli-table');
var path = require('path');
var dateformat = require('dateformat');
var prettyjson = require('prettyjson');

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

var assertSectionInConfigFile = function (config, sectionName) {
 if (!config[sectionName]) {
  console.error("The pkgcloud-cli.json section is missing a ["+
                sectionName + "] section");
  process.exit(0);
 }
};

var globalErrorHandler = function(message, data){
  var prettyJson = prettyjson.render(data);
  console.log("\n");
  console.log(message.red);
  console.log(prettyJson);
  console.log("\n");
  process.exit(1);
};

exports.init = function(config, type, callback) {
  if (!config) {
    return callback(new Error('No config file specified.  See -h for assistance'));
  }
  config = loadConfig(config);
  assertSectionInConfigFile(config, type.toLowerCase());
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

  if(client) {
    client.on("log::error", globalErrorHandler);
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

exports.writeBlankInit = function(configPath) {
  configPath = configPath || path.join(osenv.home(), 'pkgcloud-cli.json');
  if (fs.existsSync(configPath)) {
    console.log('Warning:', configPath, 'file already exists. Not over-writing');
  }
  else {
    fs.writeFile(configPath, JSON.stringify(blankInit, null, '  '), function (err) {
        if (err) throw err;
        console.log('Example config.json file has been written to', configPath);
    });
  }
};

var blankInit = {
  compute: [
    {
      authUrl: "https://identity.api.rackspacecloud.com",
      region: "DFW",
      provider: "rackspace",
      username: "ABCD",
      apiKey: "1234"
    }
  ],
  storage: [
  ],
  database: [
  ],
  dns: [
  ],
  network: [
  ]
};

module.exports = exports;

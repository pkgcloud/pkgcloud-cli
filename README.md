# pkgcloud-cli

Basic commandline wrapper around the wonderful pkgcloud nodejs module.

Thanks to @dscape for suggesting the idea when Nodejitsu released the pkgcloud module (https://groups.google.com/forum/#!topic/nodejs/nMIxPJO7o20)

## THIS IS UNDER ACTIVE DEVELOPMENT AND CURRENTLY DEPENDS ON A PRIVATE PACKAGE.


1. npm install -g pkgcloud-cli
1. Create a pkgcloud-cli.json file in your home directory specifying the pkgcloud compute config parameters:

```
  [  
    {
      "authUrl": "https://identity.api.rackspacecloud.com",
      "region": "ORD",
      "provider": "rackspace",
      "username": "yourusername",
      "apiKey": "yourapikey"
    },
    {
      "authUrl": "https://identity.api.rackspacecloud.com",
      "region": "DFW",
      "provider": "rackspace",
      "username": "yourusername",
      "apiKey": "yourapikey"
    },
    {
      "authUrl": "https://lon.identity.api.rackspacecloud.com",
      "region": "LON",
      "provider": "rackspace",
      "username": "yourusername",
      "apiKey": "yourapikey"
    }
  ]
```
1. use pkgcloud-cli
```
 $pkgcloud --help

  Usage: pkgcloud [options] [command]

  Commands:

    compute                Compute commands
    storage                Storage commands
    database               Database commands
    help [cmd]             display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```
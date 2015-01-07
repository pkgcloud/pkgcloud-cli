# pkgcloud-cli

![pkgcloud-cli download history](https://nodei.co/npm-dl/pkgcloud-cli.png)

Basic commandline wrapper around the pkgcloud nodejs module.

```
npm install -g pkgcloud-cli
```

Create a pkgcloud-cli.json file in your home directory specifying the pkgcloud compute config parameters.  These parameters are identical to pkgcloud with the exception of adding a 'region' parameter.  Initially,
region will be ignored and it will only use the first config for each type (compute, storage, database).  

However, the intent is to expand pkgcloud-cli to use a new library, multi-pkgcloud which will allow interacting with multiple provider endpoints at once.


```
{
  "compute": [  
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
    ],
  "storage": [
  ],
  "database": [
  ],
  "dns": [
  ]
}

```

use pkgcloud-cli

```
 $pkgcloud --help

  Usage: pkgcloud [options] [command]

  Commands:
    init                   Initialize pkgcloud-cli config file
    compute                Compute commands
    storage                Storage commands
    database               Database commands
    dns                    DNS commands
    help [cmd]             display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

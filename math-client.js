var http = require('http');
var util = require('util');

[
    '/fibonacci/20',
    '/factorial/20',
    '/multi/10/20',
    '/square/12'
].forEach(function(path, i) {
        var index = i;
        var req = http.request({
            host: 'localhost',
            port: 3002,
            path: path,
            method: 'GET'
        }, function(res) {
            res.on('data', function(chunk) {
                util.log('BODY ('+ index +'): ' + chunk);
            });
        });
        req.end();
    });
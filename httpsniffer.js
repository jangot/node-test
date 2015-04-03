var util = require('util');
var url = require('url');

exports.sniffOn = function(server) {
    server.on('request', function() {
        util.log('e_request');
        util.log(reqToString(req));
    });

    server.on('close', function(errno) {
        util.log('e_close=' + errno);
    });

    server.on('checkContinue', function(req, res) {
        util.log('e_checkContinue');
        util.log(reqToString(req));
        res.writeContinue();
    });

    server.on('upgrade', function(req, socket, head) {
        util.log('e_upgrade');
        util.log(reqToString(req));
    });

    server.on('clientError', function() {
        util.log('e_clientError');
    });
}
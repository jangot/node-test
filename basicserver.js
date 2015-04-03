var http = require('http');
var url = require('url');

exports.createServer = function() {
    var htserver = http.createServer(function(req, res) {
        req.basicServer = {
            urlparsed: url.parse(req.url, true)
        }
        processHeaders(req, res);
        dispatchToContainer(htserver, req, res);
    });
    htserver.basicServer = {containers: []};
    htserver.addContainer = function (host, path, module, options) {
        if (lookupContainer(htserver, host, path) !== undefined) {

        }
    }
}
var http = require('http');
var express = require('express');
var htutil = require('./htutil');
var favicons = require('connect-favicons');
var logger = require('connect-logger');


var app = express();

app.use(logger({path: __dirname + '/logs/common.txt'}));
app.use(favicons(__dirname + '/public/img/icons'));
app.use(express.static(__dirname+'/public'));

app.get('/', require('./home-node').get);
app.get('/square', htutil.loadParams, require('./square-node').get);
app.get('/factorial', htutil.loadParams, require('./factorial-node').get);
app.get('/fibonacci', htutil.loadParams, require('./fibo2-node').get);
app.get('/mult', htutil.loadParams, require('./mult-node').get);

//app
//    //.use(app.favicon())
//    //.use(app.logger())
//    //.use('/filez', app.static(__dirname + '/filez'))
//    .use(app.router(function(app) {
//
//    }));

http
    .createServer(app)
    .listen(8124);

console.log('listen to http://localhost:8124');
var http = require('http');
var express = require('express');
var favicons = require('connect-favicons');
var logger = require('express-logger');
var layout = require('express-layout');

var htutil = require('./htutil');
var math = require('./math');


var app = express();

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger({path: __dirname + '/logs/common.txt'}));

app.use(layout());
app.set('layouts', __dirname + '/views/layouts');
app.set('layout', 'layout.html');

app.use(favicons(__dirname + '/public/img/icons'));
app.use(express.static(__dirname+'/public'));

//app.use(express.errorHandlers({
//    dumpExceptions: true,
//    showStack: true
//}));

var TITLE = 'Math Wizard';

app.get('/', function(req, res) {
    res.render('home.html', {title: TITLE});
});
app.get('/mult', htutil.loadParams, function(req, res) {
    if (req.a && req.b) req.result = req.a * req.b;
    res.render('mult.html', {
        title: TITLE,
        req: req
    });
});
app.get('/square', htutil.loadParams, function(req, res) {
    if (req.a) req.result = req.a * req.a;
    res.render('square.html', {
        title: TITLE,
        req: req
    });
});
app.get('/fibonacci', htutil.loadParams, function(req, res) {
    if (req.a) {
        math.fibonacciAsync(Math.floor(req.a), function(val) {
            req.result = val;
            res.render('fibo.html', {
                title: TITLE,
                req: req
            });
        });
    } else {
        res.render('fibo.html', {
            title: TITLE,
            req: req
        });
    };
});
app.get('/factorial', htutil.loadParams, function(req, res) {
    if (req.a) req.result = math.factorial(req.a);
    res.render('square.html', {
        title: TITLE,
        req: req
    });
});
app.get('/404', function(req, res) {
    res.send('NOT FOUND ' + req.url)
});

//app.get('/', require('./home-node').get);
//app.get('/square', htutil.loadParams, require('./square-node').get);
//app.get('/factorial', htutil.loadParams, require('./factorial-node').get);
//app.get('/fibonacci', htutil.loadParams, require('./fibo2-node').get);
//app.get('/mult', htutil.loadParams, require('./mult-node').get);

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
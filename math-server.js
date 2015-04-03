var math = require('./math');
var http = require('http');
var express = require('express');
var logger = require('express-logger');

var app = express();

app.use(logger({path: __dirname + '/logs/common.txt'}));

app.get('/fibonacci/:n', function(req, res, next) {
    math.fibonacciAsync(
        Math.floor(req.params.n),
        function(val) {
            res.send({n: req.params.n, result: val});
        }
    );
});
app.get('/factorial/:n', function(req, res, next) {
    res.send({
        n: req.params.n,
        result: math.factorial(Math.floor(req.params.n))
    });
});
app.get('/multi/:a/:b', function(req, res, next) {
    res.send({
        a: req.params.a,
        b: req.params.b,
        result: req.params.a * req.params.b
    });
});
app.get('/square/:a', function(req, res, next) {
    res.send({
        a: req.params.a,
        result: req.params.a * req.params.a
    });
});

http
    .createServer(app)
    .listen(3002);

console.log('listen to http://localhost:3002');
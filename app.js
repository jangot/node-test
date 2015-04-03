var http = require('http');
var util = require('util');
var url = require('url');

var express = require('express');
var logger = require('express-logger');
var bodyParser = require('body-parser');
var layout = require('express-layout');

//var nmDbEngine = 'sqlite3';
var nmDbEngine = 'mongoose';
var notesdb = require('./notesdb-' + nmDbEngine);

var app = express();
app.use(logger({path: __dirname + '/logs/common.txt'}));
app.use(bodyParser.urlencoded({ extended: false }));

var views = __dirname + '/views-' + nmDbEngine;
app.engine('html', require('ejs').renderFile);
app.set('views', views);
app.set('view engine', 'ejs');

app.use(layout());
app.set('layouts', views + '/layouts');
app.set('layout', 'layout.html');

app.use(express.static(__dirname+'/public'));

//---------
var parseUrlParams = function(req, res, next) {
    req.urlP = url.parse(req.url, true);
    next();
}

notesdb.connect(function(err) {
    if (err) throw err;
});
app.on('close', function() {
    notesdb.disconnect(function(err){});
});

app.get('/', function(req, res) {res.redirect('/view')});
app.get('/view', function(req, res) {
    notesdb.allNotes(function(err, notes) {
        if (err) {
            util.log('ERROR' + err);
        } else {
            res.render('viewnotes.html', {
                title: 'Notes ('+ nmDbEngine +')',
                notes: notes
            });
        }
    });
});
app.get('/add', function(req, res) {
    res.render('addedit.html', {
        title: 'Notes ('+ nmDbEngine +')',
        postpath: '/add',
        note: notesdb.emptyNote
    });
});
app.post('/add', function(req, res) {
    notesdb.add(
        req.body.author, req.body.note,
        function(err) {
            if (err) throw err;
            res.redirect('/view');
        }
    );
});
app.get('/del', parseUrlParams, function(req, res) {
    notesdb.delete(
        req.urlP.query.id,
        function(err) {
            if (err) throw err;
            res.redirect('/view');
        }
    );
});
app.get('/edit', parseUrlParams, function(req, res) {
    notesdb.findNoteById(
        req.urlP.query.id,
        function(err, note) {
            if (err) throw err;
            res.render('addedit.html', {
                title: 'Notes ('+ nmDbEngine +')',
                postpath: '/edit',
                note: note
            });
        }
    );
});
app.post('/edit', function(req, res) {
    notesdb.edit(
        req.body.id, req.body.author, req.body.note,
        function(err) {
            if (err) throw err;
            res.redirect('/view');
        }
    );
});


//app.use(express.errorHandlers({
//    dumpExceptions: true,
//    showStack: true
//}));

//app.error(function(err, req, res) {
//    res.render('500.html', {
//        title: 'Notes ('+ nmDbEngine +')',
//        error: err
//    })
//});

http
    .createServer(app)
    .listen(3000);

console.log('Run server localhost:3000');

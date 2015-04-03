var util = require('util');
var async = require('async');
//var notesdb = require('./notesdb-sqlite3');
var notesdb = require('./notesdb-mongoose');

notesdb.connect(function(err) {
    if (err) throw err;
});
notesdb.setup(function(err) {
    if (err) {
        util.log('setup ERROR ' + err);
        throw err;
    }
    async.series(
        [
            function(cb) {
                notesdb.add(
                    'Lorem Ipsum ',
                    'sdfsdf sdf sdf  sdf sd .. sdfsd... sdfsdf',
                    function(err) {
                        if (err) util.log('add1 ERROR ' + err);
                        cb(err);
                    }
                )
            },
            function(cb) {
                notesdb.add(
                    'Pulin Pavel ',
                    'sdf--- sd .. sdfsd... sdfsdf',
                    function(err) {
                        if (err) util.log('add2 ERROR ' + err);
                        cb(err);
                    }
                )
            }
        ],
        function(err, result) {
            if (err) util.log('result ERROR ' + err);
            notesdb.disconnect(function(err){});
        }
    );
});
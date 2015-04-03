var util = require('util');
var notesdb = require('./notesdb-sqlite3');

notesdb.connect(function(err) {
    if (err) throw err;
    util.log('Connect.');
});
notesdb.forAll(function(err, row) {
    util.log('\n' + util.inspect(row) + '\n')
}, function(err) {
    if (err) throw err;
    util.log('All done');
    notesdb.disconnect(function(err) {});
});
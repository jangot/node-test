var util = require('util');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var dburl = 'mongodb://localhost/chap06';

exports.connect = function() {
    mongoose.connect(dburl);
}
exports.disconnect = function(cb) {
    mongoose.disconnect(cb);
}
exports.setup = function(cb) {cb(null);}

var NoteSchema = new Schema({
    ts: {type: Date, default: Date.now},
    author     : String,
    note      : String
});
mongoose.model("Note", NoteSchema);
var Note = mongoose.model('Note');
exports.emptyNote = {'_id': '', author: '', note: ''};

exports.add = function(author, note, cb) {
    var newNote = new Note();
    newNote.author = author;
    newNote.note = note;
    newNote.save(function(err) {
        if (err) {
            util.log('FAIL ' + err);
        }
        cb(err);
    });
}
exports.delete = function(id, cb) {
    exports.findNoteById(id, function(err, doc) {
        if (err) {
            cb(err);
        } else {
            util.log(util.inspect(doc));
            doc.remove();
            cb(null);
        }
    });
}
exports.edit = function(id, author, note, cb) {
    exports.findNoteById(id, function(err, doc) {
        if (err) {
            cb(err);
        } else {
            doc.ts = new Date();
            doc.author = author;
            doc.note = note;
            doc.save(function(err) {
                if (err) {
                    util.log('FATAL ' + err);
                }
                cb(err);
            });
        }
    });
}
exports.allNotes = function(cb) {
    Note.find({}, cb);
}
exports.forAll = function(doEach, done) {
    Note.find({}, function(err, docs) {
        if (err) {
            util.log('FAIL ' + err);
            done(err, null);
        } else {
            docs.forEach(function(doc) {
                doEach(null, doc);
            });
            done(null);
        }
    });
}
var findNoteById = exports.findNoteById = function(id, cb) {
    Note.findOne({_id: id}, function(err, doc) {
        if (err) {
            util.log('FATAL ' + err);
        }
        cb(err, doc);
    });
}
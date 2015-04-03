var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post
var NoteSchema = new Schema({
    ts: {type: Date, default: Date.now},
    author     : String,
    note      : String
});
mongoose.model("Note", NoteSchema);
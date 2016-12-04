var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentSchema   = new Schema({
    body: String,
    date: { type: Date, default: Date.now },
    firstName: String,
    lastName: String
});

var SiteSchema   = new Schema({
    address: String,
    latitude: Number,
    longitude: Number,
    login: String,
    comments: [CommentSchema]
});

module.exports = mongoose.model('Site', SiteSchema);

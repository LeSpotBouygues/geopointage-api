var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SiteSchema   = new Schema({
    address: String,
    latitude: Number,
    longitude: Number,
    login: String
});

module.exports = mongoose.model('Site', SiteSchema);

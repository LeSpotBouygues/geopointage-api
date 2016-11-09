var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointageSchema   = new Schema({
    registrationNumber: String,
    constructionSite: String,
    date: Date,
    numberOfHours: Number
});

module.exports = mongoose.model('Pointage', PointageSchema);

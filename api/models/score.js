var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema   = new Schema({
    login: String,
    address: String,
    date: Date,
    numberOfHours: Number,
    worker: {
	firstName: String,
	lastName: String
    }
});

module.exports = mongoose.model('Pointage', ScoreSchema);

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PointageSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Pointage', PointageSchema);

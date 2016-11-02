var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ChantierSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Chantier', ChantierSchema);

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CollaborateurSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Collaborateur', CollaborateurSchema);

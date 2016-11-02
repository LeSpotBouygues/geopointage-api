var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentaireSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Commentaire', CommentaireSchema);

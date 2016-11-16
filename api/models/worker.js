var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WorkerSchema   = new Schema({
    firstName: String,
    lastName: String,
    registrationNumber: String
});

module.exports = mongoose.model('Worker', WorkerSchema);

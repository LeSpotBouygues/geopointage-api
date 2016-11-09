var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WorkerSchema   = new Schema({
    name: String,
    firstName: String,
    registrationNumber: String
});

module.exports = mongoose.model('Worker', WorkerSchema);

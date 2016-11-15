var app = require('./app');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/geo');

// API Controllers
var workers = require('./api/controllers/WorkersController');
var sites = require('./api/controllers/SitesController');
var comments = require('./api/controllers/CommentsController');
var scores = require('./api/controllers/ScoresController');

// TODO: apiVersion and port should be configurable by options params
var apiVersion = "/v0";
var port = 8080;

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});


// Call api routes
app.use(apiVersion + '/workers', workers);
app.use(apiVersion + '/sites', sites);
app.use(apiVersion + '/comments', comments);
app.use(apiVersion + '/scores', scores);

// Call routes
// app.use('/workers', workers);
// app.use('/sites', sites);
// app.use('/comments', comments);
// app.use('/scores', scores);

app.listen(port);
console.log("Api and web have been launched on http://localhost:" + port)

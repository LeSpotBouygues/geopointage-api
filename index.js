var app = require('./app');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/geo');

// Controllers
var workers = require('./controllers/WorkersController');
var sites = require('./controllers/SitesController');
var comments = require('./controllers/CommentsController');
var scores = require('./controllers/ScoresController');

// TODO: apiVersion and port should be configurable by options params
var apiVersion = "";
var port = 8080;

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Call routes
app.use('/workers', workers);
app.use('/sites', sites);
app.use('/comments', comments);
app.use('/scores', scores);

app.listen(port);

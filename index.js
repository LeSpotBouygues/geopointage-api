var api = require('./app');
// var app = require('./app');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/geo');

// API Controllers
var workers = require('./api/controllers/WorkersController');
var sites = require('./api/controllers/SitesController');
var comments = require('./api/controllers/CommentsController');
var scores = require('./api/controllers/ScoresController');

// Web Controllers
// var auth = require('./controllers/AuthController');

// TODO: apiVersion and port should be configurable by options params
var apiVersion = "/v0";
var apiPort = 8081;
// var webPort = 8080;

api.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});


// Call api routes
api.use(apiVersion + '/workers', workers);
api.use(apiVersion + '/sites', sites);
api.use(apiVersion + '/comments', comments);
api.use(apiVersion + '/scores', scores);

// Call routes
// app.use('/', auth);
// app.use('/sites', sites);
// app.use('/comments', comments);
// app.use('/scores', scores);

api.listen(apiPort);
// app.listen(webPort);
// console.log("Web site has been launched on http://localhost:" + webPort)
console.log("Api has been launched on http://localhost:" + apiPort)

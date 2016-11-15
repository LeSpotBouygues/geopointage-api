var express = require('express');
var app = require('./app');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/geo');

// Web Controllers
var auth = require('./controllers/AuthController');
var workers = require('./controllers/WorkersController');
var sites = require('./controllers/SitesController');
var scores = require('./controllers/ScoresController');
var extern = require('./controllers/ExternController');

var webPort = 8080;

app.use(express.static(path.join(__dirname, '/public')));

// Call routes
app.use('/', auth);
app.use('/workers', workers);
app.use('/sites', sites);
app.use('/extern', extern);
app.use('/scores', scores);


app.listen(webPort);
console.log("Web site has been launched on http://localhost:" + webPort)

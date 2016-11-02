var app = require('./app');


// Controllers
var collaborateurs = require('./controllers/CollaborateursController');
var chantiers = require('./controllers/ChantiersController');
var commentaires = require('./controllers/CommentairesController');
var pointages = require('./controllers/PointagesController');

// TODO: apiVersion and port should be configurable by options params
var apiVersion = "";
var port = 8080;

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Call routes
app.use('/collaborateurs', collaborateurs);
app.use('/chantiers', chantiers);
app.use('/commentaires', commentaires);
app.use('/pointages', pointages);

app.listen(port);

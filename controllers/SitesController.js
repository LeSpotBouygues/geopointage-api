var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(jsend.middleware);

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

/**
 * GET /workers
 * Get a list of workers
 */
router.get('/', function(req, res, next) {
    request.get("http://localhost:8081/v0/sites", function(err, response, body) {
	var data = JSON.parse(body);
//	console.log(data);
	res.render('siteList.ejs', {sites: data.data});
    });
});

router.get('/create', function(req, res, next) {
    res.render('createSite.ejs');
});

router.get('/delete', function(req, res, next) {
    request.delete("http://localhost:8081/v0/sites/" + req.query.siteId, function(err, response, body) {
	res.redirect('/sites');
    });
});

module.exports = router;

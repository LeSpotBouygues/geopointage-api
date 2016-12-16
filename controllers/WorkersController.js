var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var request = require('request');


router.use(jsend.middleware);

var url = "http://localhost:8080/"

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
    request.get("http://localhost:8081/v0/workers", function(err, response, body) {
	var data = JSON.parse(body);
//	console.log(data);
	res.render('workerList.ejs', {workers: data.data});
    });
});


router.get('/create', function(req, res, next) {
    res.render('createWorker.ejs', {url: url, error: false, message:"Fields are missing"});
});

router.post('/create', urlencodedParser, function(req, res, next) {

    if (!req.body.firstName || !req.body.lastName || !req.body.registrationNumber) {
	res.render('createWorker.ejs', {url: url, error: true, message:"Fields are missing"});
    }
    else {
	request.post({url: "http://localhost:8081/v0/workers",
		      form: {firstName: req.body.firstName,
			     lastName: req.body.lastName,
			     registrationNumber: req.body.registrationNumber }}, function(err, response, body) {
	    res.redirect('/workers');
	});
    }
});

router.get('/update/:workerId', function(req, res, next) {
    request.get({url: "http://localhost:8081/v0/workers/" + req.params.workerId},
		function(err, response, body) {
		    var data = JSON.parse(body);
		    res.render('updateWorker.ejs', {url: url, error: false,
						    message:"Certains champs sont manquants", data: data.data});
		});
});

router.post('/update', urlencodedParser, function(req, res, next) {
    res.redirect('update/' + req.body.workerId);
});

router.post('/update/:workerId', urlencodedParser, function(req, res, next) {

    if (!req.body.firstName || !req.body.lastName || !req.body.registrationNumber) {

	var data = {
	    registrationNumber: req.body.registrationNumber,
	    firstName: req.body.firstName,
	    lastName: req.body.lastName
	}
	
	res.render('updateWorker.ejs', {url: url, error: true,
							message:"Certains champs sont manquants", data: data});

    }
    else {
	request.put({url: "http://localhost:8081/v0/workers/" + req.params.workerId,
		      form: {firstName: req.body.firstName,
			     lastName: req.body.lastName,
			     registrationNumber: req.body.registrationNumber }}, function(err, response, body) {
	    res.redirect('/workers');
	});
    }
});

router.get('/delete', function(req, res, next) {
    if (req.query.workerId) {
	request.delete("http://localhost:8081/v0/workers/" + req.query.workerId, function(err, response, body) {
	    res.redirect('/workers');
	});
    }
});

module.exports = router;

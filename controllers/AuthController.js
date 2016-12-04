var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(jsend.middleware);

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res, next) {
    res.render('login.ejs', {error: ""});
});

router.post('/', urlencodedParser, function(req, res) {
    // TODO: Create a worker
    if (!req.body.user || !req.body.password) {
	res.render('login.ejs', {error: "user or password invalid."});
    }
    else {
	console.log(req.body.user);
	console.log(req.body.password);
	if (req.body.user == "admin" && req.body.password == "admin") {
	    res.redirect('/workers');
	} else {
	    res.render('login.ejs', {error: "user or password invalid."});
	}
    }
});

router.put('/:workerId', function(req, res) {
    // TODO: Modify a worker based on the passed worker ID
    Worker.findById(req.params.workerId, function(err, worker) {
	if (err)
	    res.send(err);
	
	worker.name = req.body.name;
	worker.firstName = req.body.firstName;
	worker.registrationNumber = req.body.registrationNumber;
	
	// save the bear
	worker.save(function(err) {
	    if (err)
		res.send(err);
	    res.status(201).jsend.success({ message: 'Worker updated!' });
	});
    });
    
    // res.status(501).jsend.success(null);
});

module.exports = router;

var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var Worker = require('./../models/worker')


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
    // TODO: Get a list of workers based on the passed criteria
    Worker.find(function(err, workers) {
	if (err)
	    res.fail(err);
	res.status(200).jsend.success(workers);
    });
    // res.status(501).jsend.success(null);
});

/**
 * GET /workers/:workerId
 * Get a worker based on the passed worker ID 
 */
router.get('/:workerId', function(req, res) {
    // TODO: Get a worker based on the passed worker ID
    Worker.findById(req.params.workerId, function(err, worker) {
	if (err)
	    res.fail(err);
	res.status(200).jsend.success(worker);
    });
});

/**
 * POST /workers
 * Create a worker
 */
router.post('/', urlencodedParser, function(req, res) {
    // TODO: Create a worker
     if (!req.body.firstName || !req.body.lastName || !req.body.registrationNumber) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters'});
    }

    var worker = new Worker();

    worker.firstName = req.body.firstName;
    worker.lastName = req.body.lastName;
    worker.registrationNumber = req.body.registrationNumber;

    worker.save(function(err) {
	if (err)
	    res.send(err);
	res.status(201).jsend.success({ message: 'Worker created!' });
    });
});

/**
 * PUT /workers/:workerId
 * Modify a worker based on the passed worker ID 
 */
router.put('/:workerId', urlencodedParser, function(req, res) {
    // TODO: Modify a worker based on the passed worker ID

    if (!req.body.firstName || !req.body.lastName || !req.body.registrationNumber) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters'});
    }
    
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
	    res.status(204).jsend.success({ message: 'Worker updated!' });
	});
    });
    
    // res.status(501).jsend.success(null);
});

/**
 * DELETE /workers/:workerId
 * Delete a worker based on the passed worker ID 
 */
router.delete('/:workerId', function(req, res) {
    // TODO: Delete a worker based on the passed worker ID
    Worker.remove({
	_id: req.params.workerId
    }, function(err, worker) {
	if (err)
	    res.send(err);
	res.status(204).jsend.success({ message: 'Worker deleted!' });
    });
});

/**
 * GET /workers/import
 * Get cubes based on the passed criteria 
 */
router.get('/import', function(req, res) {
    // TODO: Get worker(s) based on a search
    res.status(501).jsend.success(null);
});

module.exports = router;

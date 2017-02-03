var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var Score = require('./../models/score')

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(jsend.middleware);

/**
 * GET /scores
 * Get a list of scores
 */
router.get('/', function(req, res, next) {
    Score.find(function(err, scores) {
	if (err)
	    res.fail(err);
	else
	    res.status(200).jsend.success(scores);
    });
});

/**
 * GET /scores/:scoreId
 * Get a scores based on the passed score ID 
 */
router.get('/:scoreId', function(req, res) {
    Score.findById(req.params.scoreId, function(err, score) {
	if (err)
	    res.fail(err);
	else
	    res.status(200).jsend.success(score);
    });
});

/**
 * POST /scores
 * Create a score
 */
router.post('/', urlencodedParser, function(req, res) {    
    if (!req.body.login || !req.body.address || !req.body.date || !req.body.numberOfHours
       || !req.body.firstName || !req.body.lastName) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters'});
    }

    var score = new Score();

    var st = req.body.date;
    var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
    var dt = new Date(st.replace(pattern,'$3-$2-$1'));
    
    score.login = req.body.login;
    score.address = req.body.address;
    score.date = dt;
    score.numberOfHours = req.body.numberOfHours;
    score.worker.firstName = req.body.firstName;
    score.worker.lastName = req.body.lastName;


    score.save(function(err) {
	if (err)
	    res.send(err);
	else
	    res.status(201).jsend.success({ message: 'Score created!' });
    });
});



router.post('/import', urlencodedParser, function(req, res, next) {
    if (!req.body.body) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters'});
    }

    var score = new Score();
    
    var scores = [];
    
    var body = JSON.parse(req.body.body);

    for (var i = 0; i != body.length; i++) {
	for (var j = 0; j != body[i].workers.length; j++) {
	    var st = body[i].date;
	    var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
	    var dt = new Date(st.replace(pattern,'$3-$2-$1'));

	    console.log("firstName : " + body[i].workers[j]);
	    console.log("firstName : " + body[i].workers[j].firstName);
	    console.log("lastName : " + body[i].workers[j].lastName);
	    
	    var score = {
		login: body[i].login,
		address: body[i].address,
		date: dt,
		numberOfHours: body[i].numberOfHours,
		worker: {
		    firstName: body[i].workers[j].firstName,
		    lastName: body[i].workers[j].lastName
		}
	    };
	    scores.push(score);
	}
    }

    Score.collection.insert(scores, function(err) {
	if (err) {
	    return res.jsend.fail(err);
	} else {
	    res.status(201).jsend.success({ message: 'Scores created!' });
	}
    });
    
    // res.status(200).jsend.success(obj);
});

/**
 * PUT /scoress/:scoreId
 * Modify a score based on the passed scores ID 
 */
router.put('/:scoreId', function(req, res) {
    // TODO: Modify a score based on the passed score ID
    res.status(501).jsend.success(null);
});

/**
 * DELETE /scores/:scoreId
 * Delete a score based on the passed score ID 
 */
router.delete('/:scoreId', function(req, res) {
    Score.remove({
	_id: req.params.scoreId
    }, function(err, score) {
	if (err)
	    res.send(err);
	else
	    res.status(204).jsend.success({ message: 'Score deleted!' });
    });
});


/**
 * GET /scores/:scoreId
 * Get a scores based on the passed score ID 
 */
router.get('/from/:dateFrom/to/:dateTo', function(req, res) {

    var from = req.params.dateFrom.split('-');
    var to = req.params.dateTo.split('-');

    var stringToInt = function (x) {
	return  parseInt(x);
    };

    from = from.map(stringToInt);
    to = to.map(stringToInt);
    
    var criteria = {
	"date": {
	    "$gte": new Date(from[2], from[1] - 1, from[0]),
	    "$lt": new Date(to[2], to[1] - 1, to[0])
	} 
    };

    Score.find(criteria, function(err, score) {
	if (err)
	    res.fail(err);
	else
	    res.status(200).jsend.success(score);
    });
});

module.exports = router;

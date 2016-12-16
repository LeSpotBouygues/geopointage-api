var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');
var link = require('./../link');
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var request = require('request');

var moment = require('moment');

router.use(jsend.middleware);

var url = link;

router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

/**
 * GET /workers
 * Get a list of workers
 */
router.get('/', function(req, res, next) {
    request.get("http://localhost:8081/v0/scores", function(err, response, body) {
	var data = JSON.parse(body);
	//	console.log(data);
	for (var i = 0; i < data.data.length;i++) {
	    data.data[i].date = moment(data.data[i].date).format("DD-MM-YYYY");
	    // console.log(moment(scores[i].date).format("DD-MM-YYYY"));
	}

	
	res.render('scoreList.ejs', {scores: data.data});
    });
    
});

module.exports = router;

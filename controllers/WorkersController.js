var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    res.render('workerList.ejs' );
});

/**
 * POST /workers
 * Create a worker
 */
router.post('/', urlencodedParser, function(req, res) {
    res.render('siteList.ejs' );
});


router.get('/create', function(req, res, next) {
    res.render('createWorker.ejs', {url: url});
});


module.exports = router;

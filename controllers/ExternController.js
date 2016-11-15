var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require("fs");

var url = "http://localhost:8080/"
var date = new Date();

router.use(jsend.middleware);

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/import', function(req, res, next) {
    res.render('import.ejs', {url: url});
});


router.post('/importWorkers', function(req, res, next) {
    var fd = fs.openSync(process.cwd() + "/export/export_" +
			 date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" +
			 date.getHours() + "-" + date.getMinutes() + "-"  +  date.getSeconds(), 'w');
    console.log(process.cwd());
    res.render('import.ejs', {url: url});
});

router.post('/importSites', function(req, res, next) {
    res.render('import.ejs', {url: url});
});


router.get('/export', function(req, res, next) {
    res.render('export.ejs' , {url: url});
});

router.post('/', function(req, res, next) {
    res.render('export.ejs' , {url: url});
});


module.exports = router;

var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require("fs");
var request = require('request');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
	cb(null, '/tmp/my-uploads/')
    },
    filename: function (req, file, cb) {
	cb(null, "spot.xlsx")
    }
})
var upload = multer({ storage: storage });

var url = "http://localhost:8080/";
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

router.post('/importWorkers', upload.single('myfile'), function(req, res, next) {
    request.get({url: "http://localhost:8081/v0/workers/import"},
		function(err, response, body) {
		    res.render('import.ejs', {url: url});
		});
});

// router.post('/importSites', function(req, res, next) {
// });


router.get('/export', function(req, res, next) {
    res.render('export.ejs' , {url: url});
});

router.post('/', function(req, res, next) {
    res.render('export.ejs' , {url: url});
});


module.exports = router;

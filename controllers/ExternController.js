var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');
var link = require('./../link');
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require("fs");
var request = require('request');
var multer  = require('multer');
var archiver = require('archiver');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
	cb(null, '/tmp/my-uploads/')
    },
    filename: function (req, file, cb) {
	cb(null, "spot.xlsx")
    }
})
var upload = multer({ storage: storage });

var url = link;
var date = new Date();

router.use(jsend.middleware);

// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });

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

router.post('/export', urlencodedParser, function(req, res, next) {
    request.get({url: "http://localhost:8081/v0/scores/from/" + req.body.from + "/to/" + req.body.to},
    		function(err, response, body) {
    		    data = JSON.parse(body);
		    if (data.data != []) {			
			var array = data.data.map(function (x) {
			    var str = x.login + "¤¤" + x.address + "¤¤" + x.date + "¤¤" + x.numberOfHours + "¤¤" +
				x.worker.firstName + "¤¤" + x.worker.lastName;
			    return str;
			});

			fs.writeFile(__dirname + '/pointages.csv', '\ufeff' + '¤¤' +
				     array.join('¤¤¤¤¤¤\n') + '¤¤¤¤¤¤\n',
				     function (err) {
					 if (err) {
					     return res.err(err);
					 } else {
					     res.download(__dirname + '/pointages.csv');
					 }
				     });


			
			// var output = fs.createWriteStream(__dirname + '/export.zip');
			// var archive = archiver('zip', {
    			//     store: true // Sets the compression method to STORE.
			// });
			

			// output.on('close', function() {
			// });
		    
			// archive.on('error', function(err) {
    			//     throw err;
			// });
		    
			// archive.pipe(output);
		    
			// archive.append('\ufeff' + '¤¤' + array.join('¤¤¤¤¤¤\n'), { name: 'pointages.csv' });
			
			// archive.finalize();
			// res.download(__dirname + '/export.zip');
		    }
		    else {
			res.render('export.ejs' , {url: url});
		    }
    		});
});


module.exports = router;

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

    // console.log(req.body);
        // create a file to stream archive data to.
    var output = fs.createWriteStream(__dirname + '/export.zip');
    var archive = archiver('zip', {
    	store: true // Sets the compression method to STORE.
    });

    // listen for all archive data to be written
    output.on('close', function() {
    	// console.log(archive.pointer() + ' total bytes');
    	// console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
    	throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);


    // append a file from string
    archive.append('string cheese!', { name: 'file2.txt' });

    // append a file from buffer
    var buffer3 = new Buffer('buff it!');
    archive.append(buffer3, { name: 'file3.txt' });

    // append a file
    // archive.file('file1.txt', { name: 'file4.txt' });

    // append files from a directory
    // archive.directory('subdir/');

    // append files from a glob pattern
    // archive.glob('subdir/*.txt');

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    archive.finalize();
    res.download(__dirname + '/export.zip');
});


module.exports = router;

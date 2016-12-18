var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var Site = require('./../models/site')

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var request = require('request');

router.use(jsend.middleware);

/**
 * GET /sites
 * Get a list of sites
 */
router.get('/', function(req, res, next) {
    // TODO: Get a list of site based on the passed criteria
    Site.find(function(err, sites) {
	if (err)
	    res.jsend.fail(err);
	else
	    res.status(200).jsend.success(sites);
    });
});

/**
 * GET /sites/:siteId
 * Get a site based on the passed site ID 
 */
router.get('/:siteId', function(req, res) {
    // TODO: Get a worker based on the passed worker ID
    Site.findById(req.params.siteId, function(err, site) {
	if (err)
	    res.jsend.fail(err);
	else
	    res.status(200).jsend.success(site);
    });
});

/**
 * POST /sites
 * Create a site
 */
router.post('/', urlencodedParser, function(req, res) {
     if (!req.body.address || !req.body.login) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters' });
    }

    
    var site = new Site();

    var test = unescape(encodeURIComponent(req.body.address.replace(/ /g, "+")));
    
    // 107+Rue+Moliere+94200+Ivry-sur-Seine
    console.log(req.body.address.replace(/ /g, "+"));
    request.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + test +
		"&key=AIzaSyAoE-Zx8XsKGMztFOWBpZTwVWa9YzyZ6w8&callback=initMap", function(err, response, body) {
	var data = JSON.parse(body);
	// console.log(body);

	site.address = req.body.address;
	site.latitude = data.results[0].geometry.location.lat;
	site.longitude = data.results[0].geometry.location.lng;
	site.login = req.body.login;
	
	site.save(function(err) {
    	    if (err)
    		res.jsend.fail(err);
	    else
    		res.status(201).jsend.success({ message: 'Site created!' });
	});
    });
});

/**
 * GET /sites/byEotp/:eotp
 * Get a worker based on the passed worker ID 
 */
router.get('/byEotp/:eotp', function(req, res) {
    // TODO: Get a worker based on the passed worker ID
    Site.find({login: req.params.eotp}, function(err, site) {
	if (err)
	    res.fail(err);
	res.status(200).jsend.success(site);
    });
});

/**
 * DELETE /sites/:siteId
 * Delete a site based on the passed site ID 
 */
router.delete('/:siteId', function(req, res) {
    // TODO: Delete a site based on the passed site ID
    Site.remove({
	_id: req.params.siteId
    }, function(err, site) {
	if (err)
	    res.jsend.fail(err);
	else
	    res.status(204).jsend.success({ message: 'Site deleted!' });
    });
});

/**
 * DELETE /sites/byEotp/:eotp
 * Delete a site based on the passed site ID 
 */
router.delete('/byEotp/:eotp', function(req, res) {
    // TODO: Delete a site based on the passed site ID
    Site.remove({
	login: req.params.eotp
    }, function(err, site) {
	if (err)
	    res.jsend.fail(err);
	else
	    res.status(204).jsend.success({ message: 'Site deleted!' });
    });
});

/**
 * GET /sites/:siteId
 * Get a site based on the passed site ID 
 */
router.get('/:siteId/comments', function(req, res) {
    // TODO: Get a worker based on the passed worker ID
    Site.findById(req.params.siteId, function(err, site) {
	if (err)
	    res.jsend.fail(err);
	else
	    res.status(200).jsend.success(site.comments);
    });
});

/**
 * GET /:siteId/comments/commentId
 * Get a site based on the passed site ID 
 */
router.get('/:siteId/comments/:commentId', function(req, res) {
    // TODO: Get a worker based on the passed worker ID
    Site.findById(req.params.siteId, function(err, site) {
	if (err)
	    res.jsend.fail(err);
	else if (site.comments.id(req.params.commentId) == null)
	    res.jsend.fail(err);
	else
	    res.status(200).jsend.success(site.comments.id(req.params.commentId));
    });
});

/**
 * POST /:siteId/comments
 * Create a comment
 */
router.post('/:siteId/comments', urlencodedParser, function(req, res) {
     if (!req.body.body || !req.body.firstName || !req.body.lastName) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters' });
    }
    
    Site.findById(req.params.siteId, function(err, site) {
	if (err) {
	    res.fail(err);
	} else {
	    site.comments.push({
		body: req.body.body,
		firstName: req.body.firstName,
		lastName: req.body.lastName
	    });
	
	    site.save(function(err) {
    		if (err)
    		    res.jsend.fail(err);
		else
    		    res.status(201).jsend.success({ message: 'Comment created!' });
	    });
	}
    });
});

/**
 * PUT /:siteId/comments/commentId
 * Get a site based on the passed site ID 
 */
router.put('/:siteId/comments/:commentId', urlencodedParser, function(req, res) {
     if (!req.body.body || !req.body.firstName || !req.body.lastName) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters' });
    }
    
    Site.findById(req.params.siteId, function(err, site) {
	if (err) {
	    res.jsend.fail(err);
	} else if (site.comments.id(req.params.commentId) == null) {
    	    res.jsend.fail(err);
	} else {
	    site.comments.id(req.params.commentId).body = req.body.body;
	    site.comments.id(req.params.commentId).firstName = req.body.firstName;
	    site.comments.id(req.params.commentId).lastName = req.body.lastName;

	    site.save(function(err) {
    		if (err)
    		    res.jsend.fail(err);
		else
    		    res.status(204).jsend.success({ message: 'Comment updated!' });
	    });
	}
    });
});

/**
 * DELETE /:siteId/comments
 * Create a comment
 */
router.delete('/:siteId/comments/:commentId', urlencodedParser, function(req, res) {
    Site.findById(req.params.siteId, function(err, site) {
	if (err) {
	    res.jsend.fail(err);
	} else if (site.comments.id(req.params.commentId) == null) {
    	    res.jsend.fail(err);
	} else {
	    site.comments.id(req.params.commentId).remove();
	    
	    site.save(function(err) {
    		if (err)
    		    res.jsend.fail(err);
		else
    		    res.status(204).jsend.success({ message: 'Comment deleted' });
	    });
	}
    });
});

module.exports = router;

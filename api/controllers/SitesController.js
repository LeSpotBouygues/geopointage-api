var express = require('express');
var jsend = require('jsend');
var bodyParser = require('body-parser');

var Site = require('./../models/site')

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(jsend.middleware);

/**
 * GET /sites
 * Get a list of sites
 */
router.get('/', function(req, res, next) {
    // TODO: Get a list of site based on the passed criteria
    Site.find(function(err, sites) {
	if (err)
	    res.fail(err);
	res.status(200).jsend.success(sites);
    });
});

/**
 * GET /sites/:siteId
 * Get a site based on the passed site ID 
 */
router.get('/:siteId', function(req, res) {
    // TODO: Get a site based on the passed site ID
    res.status(501).jsend.success(null);
});

/**
 * POST /sites
 * Create a site
 */
router.post('/', urlencodedParser, function(req, res) {
     if (!req.body.address) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters',
					    name: 'a address is required' });
    }
    if (!req.body.latitude) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters',
					    name: 'a latitude is required' });
    }
    if (!req.body.longitude) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters',
					    name: 'a longitude is required' });
    }
    if (!req.body.login) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters',
					    name: 'a login is required' });
    }
    
    var site = new Site();

    site.address = req.body.address;
    site.latitude = req.body.latitude;
    site.longitude = req.body.longitude;
    site.login = req.body.login;
    
    site.save(function(err) {
	if (err)
	    res.send(err);
	res.status(201).jsend.success({ message: 'Site created!' });
    });
});

/**
 * PUT /sitess/:siteId
 * Modify a site based on the passed site ID 
 */
router.put('/:siteId', function(req, res) {
    // TODO: Modify a site based on the passed site ID
    res.status(501).jsend.success(null);
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
	    res.send(err);
	res.status(201).jsend.success({ message: 'Site Successfully deleted' });
    });
});

/**
 * GET /sites/import
 * Get sites based on the passed criteria 
 */
router.get('/import', function(req, res) {
    // TODO: Get site(s) based on a search
    res.status(501).jsend.success(null);
});

module.exports = router;

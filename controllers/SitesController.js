var express = require('express'),
    jsend = require('jsend'),
    bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(jsend.middleware);

/**
 * GET /sites
 * Get a list of sites
 */
router.get('/', function(req, res, next) {
    // TODO: Get a list of site based on the passed criteria
    res.status(501).jsend.success(null);
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
    // TODO: Create a site
    if (!req.body.name) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters',
					    name: 'a name is required' });
    }
    res.status(501).jsend.success(null);
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
    res.status(501).jsend.success(null);
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

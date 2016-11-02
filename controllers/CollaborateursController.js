var express = require('express'),
    jsend = require('jsend'),
    bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(jsend.middleware);

/**
 * GET /collaborateur
 * Get a list of collaborateurs
 */
router.get('/', function(req, res, next) {
    // TODO: Get a list of collaborateurs based on the passed criteria
    res.status(501).jsend.success(null);
});

/**
 * GET /collaborateurs/:collaborateur_id
 * Get a collaborateur based on the passed collaborateur ID 
 */
router.get('/:collaborateur_id', function(req, res) {
    // TODO: Get a collaborateur based on the passed collaborateur ID
    res.status(501).jsend.success(null);
});

/**
 * POST /collaborateurs
 * Create a collaborateur
 */
router.post('/', urlencodedParser, function(req, res) {
    // TODO: Create a collaborateur_id
    if (!req.body.name) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters',
					    name: 'a name is required' });
    }
    res.status(501).jsend.success(null);
});

/**
 * PUT /collaborateurs/:collaborateur_id
 * Modify a collaborateur based on the passed collaborateur ID 
 */
router.put('/:collaborateur_id', function(req, res) {
    // TODO: Modify a collaborateur based on the passed collaborateur ID
    res.status(501).jsend.success(null);
});

/**
 * DELETE /collaborateurs/:collaborateur_id
 * Delete a collaborateur based on the passed collaborateur ID 
 */
router.delete('/:collaborateur_id', function(req, res) {
    // TODO: Delete a collaborateur based on the passed collaborateur ID
    res.status(501).jsend.success(null);
});

/**
 * GET /collaborateurs/import
 * Get cubes based on the passed criteria 
 */
router.get('/import', function(req, res) {
    // TODO: Get cube(s) based on a search
    res.status(501).jsend.success(null);
});

module.exports = router;

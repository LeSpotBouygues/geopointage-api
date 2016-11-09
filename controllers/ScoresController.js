var express = require('express'),
    jsend = require('jsend'),
    bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(jsend.middleware);

/**
 * GET /scores
 * Get a list of scores
 */
router.get('/', function(req, res, next) {
    // TODO: Get a list of scores based on the passed criteria
    res.status(501).jsend.success(null);
});

/**
 * GET /scores/:scoreId
 * Get a scores based on the passed score ID 
 */
router.get('/:scoreId', function(req, res) {
    // TODO: Get a score based on the passed score ID
    res.status(501).jsend.success(null);
});

/**
 * POST /scores
 * Create a score
 */
router.post('/', urlencodedParser, function(req, res) {
    // TODO: Create a scoreId
    if (!req.body.name) {
	return res.status(400).jsend.fail({ error_code: 'missing_parameters',
					    name: 'a name is required' });
    }
    res.status(501).jsend.success(null);
});

/**
 * PUT /scoress/:scoreId
 * Modify a score based on the passed scores ID 
 */
router.put('/:scoreId', function(req, res) {
    // TODO: Modify a score based on the passed score ID
    res.status(501).jsend.success(null);
});

/**
 * DELETE /scores/:scoreId
 * Delete a score based on the passed score ID 
 */
router.delete('/:scoreId', function(req, res) {
    // TODO: Delete a scores based on the passed score ID
    res.status(501).jsend.success(null);
});


module.exports = router;

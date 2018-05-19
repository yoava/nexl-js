const j79 = require('j79-utils');
const url = require('url'); // built-in utility
const express = require('express');
const path = require('path');
const router = express.Router();
const nexlEngine = require('nexl-engine');
const logger = require('../../api/logger');
const utils = require('../../api/utils');
const confMgmt = require('../../api/conf-mgmt');

function resolveGetParams(req) {
	const expression = req.query.expression;
	delete req.query['expression'];

	// no content in GET request
	return {
		relativePath: url.parse(req.url).pathname,
		expression: expression,
		args: req.query
	};
}

function resolvePostParams(req) {
	const expression = req.body.expression;
	delete req.body['expression'];

	return {
		relativePath: req.url,
		expression: expression,
		args: req.body
	};
}

function assembleNexlParams(httpParams) {
	if (!j79.isString(httpParams.relativePath)) {
		logger.log.error('[relativePath] is not provided');
		throw '[relativePath] is not provided';
	}

	if (!utils.isPathValid(httpParams.relativePath)) {
		logger.log.error('Got unacceptable path [%s]', httpParams.relativePath);
		throw 'Unacceptable path ( relative path contains restricted characters )';
	}

	const fullPath = path.join(confMgmt.getNexlSourcesDir(), httpParams.relativePath);
	if (!utils.isPathValid(fullPath)) {
		logger.log.error('Got unacceptable path [%s]', fullPath);
		throw 'Unacceptable path ( relative path contains restricted characters )';
	}

	let nexlSource = {};

	if (httpParams.content === undefined) {
		nexlSource.asFile = {};
		nexlSource.asFile['fileName'] = fullPath;
	} else {
		nexlSource.asText = {};
		nexlSource.asText['text'] = httpParams.content;
		nexlSource.asText['path4imports'] = path.dirname(fullPath);
	}

	return {
		nexlSource: nexlSource,
		item: httpParams.expression,
		args: httpParams.args
	};
}

function nexlizeInner(httpParams) {
	const nexlParams = assembleNexlParams(httpParams);
	return nexlEngine.nexlize(nexlParams.nexlSource, nexlParams.item, nexlParams.args);
}

function nexlize(httpParams, req, res) {
	let result;

	try {
		result = nexlizeInner(httpParams);
	} catch (e) {
		logger.log.error('nexl request rejected. Reason : [%s]', e);
		utils.sendError(res, e, 500);
		return;
	}

	// is undefined ?
	if (result === undefined) {
		logger.log.error('Got undefined value');
		utils.sendError(res, e, 555);
		return;
	}

	// is null ?
	if (result === null) {
		logger.log.error('Got null value');
		utils.sendError(res, e, 556);
		return;
	}

	// is NaN ?
	if (result !== result) {
		logger.log.error('Got NaN value');
		utils.sendError(res, e, 557);
		return;
	}

	// setting up headers
	if (j79.isArray(result) || j79.isObject(result)) {
		res.header("Content-Type", 'application/json');
	} else {
		res.header("Content-Type", 'text/plain');
	}

	// string sends as is. all other must be stringified
	if (j79.isString(result)) {
		res.send(result);
	} else {
		res.send(JSON.stringify(result));
	}
}

router.get('/*', function (req, res) {
	const httpParams = resolveGetParams(req);
	nexlize(httpParams, req, res);
});

router.post('/*', function (req, res) {
	const httpParams = resolvePostParams(req);
	nexlize(httpParams, req, res);
});

// --------------------------------------------------------------------------------
module.exports = router;
// --------------------------------------------------------------------------------

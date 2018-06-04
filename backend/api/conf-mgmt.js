const path = require('path');
const fs = require('fs');
const fsx = require('./fsx');
const util = require('util');
const j79 = require('j79-utils');
const osHomeDir = require('os-homedir');
const version = require('./../../package.json').version;

const cmdLineArgs = require('./cmd-line-args');
const utils = require('./utils');
const security = require('./security');
const logger = require('./logger');
const schemaValidation = require('./schema-validation');

const ENCODING_UTF8 = 'utf8';
const ENCODING_ASCII = 'ascii';
const AVAILABLE_ENCODINGS = [ENCODING_UTF8, ENCODING_ASCII];

let NEXL_HOME_DIR;
let CACHE = {};

// --------------------------------------------------------------------------------
// files
const CONF_FILES = {
	SETTINGS: 'settings.js', // general settings
	TOKENS: 'tokens.js', // tokens to register a user and reset password
	PASSWORDS: 'passwords.js', // password for login
	ADMINS: 'admins.js', // administrators list
	PERMISSIONS: 'permissions.js' // permissions matrix
};

// --------------------------------------------------------------------------------
// available options for SETTINGS
const SETTINGS = {
	NEXL_SOURCES_DIR: 'nexl-sources-dir',
	NEXL_SOURCES_ENCODING: 'nexl-sources-encoding',
	HTTP_TIMEOUT: 'http-timeout-sec',
	LDAP_URL: 'ldap-url',

	HTTP_BINDING: 'http-binding',
	HTTP_PORT: 'http-port',
	HTTPS_BINDING: 'https-binding',
	HTTPS_PORT: 'https-port',
	SSL_CERT_LOCATION: 'ssl-cert-location',
	SSL_KEY_LOCATION: 'ssl-key-location',

	LOG_FILE_LOCATION: 'log-file-location',
	LOG_LEVEL: 'log-level',
	LOG_ROTATE_FILE_SIZE: 'log-rotate-file-size-kb',
	LOG_ROTATE_FILES_COUNT: 'log-rotate-files-count'
};

// --------------------------------------------------------------------------------
// default values
const DEF_VALUES = {};

// SETTINGS default values
DEF_VALUES[CONF_FILES.SETTINGS] = {};
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.NEXL_SOURCES_DIR] = () => path.join(osHomeDir(), 'nexl-sources');
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.NEXL_SOURCES_ENCODING] = ENCODING_UTF8;
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.HTTP_TIMEOUT] = 10;
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.HTTP_BINDING] = 'localhost';
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.HTTP_PORT] = 8080;
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.HTTPS_BINDING] = 'localhost';
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.HTTPS_PORT] = 443;
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.LOG_FILE_LOCATION] = () => path.join(NEXL_HOME_DIR, 'nexl.log');
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.LOG_LEVEL] = 'info';
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.LOG_ROTATE_FILES_COUNT] = 999;
DEF_VALUES[CONF_FILES.SETTINGS][SETTINGS.LOG_ROTATE_FILE_SIZE] = 0; // not rotating

// TOKENS default values
DEF_VALUES[CONF_FILES.TOKENS] = {};

// PASSWORDS default values
DEF_VALUES[CONF_FILES.PASSWORDS] = {};

// ADMINS default values
DEF_VALUES[CONF_FILES.ADMINS] = [];

// PERMISSIONS default values
DEF_VALUES[CONF_FILES.PERMISSIONS] = {};


// --------------------------------------------------------------------------------
// validation schemas
const VALIDATION_SCHEMAS = {};

// --------------------------------------------------------------------------------
// SETTINGS validations
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS] = {};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.NEXL_SOURCES_DIR] = (val) => {
	if (!j79.isString(val) || val.length < 1) {
		return 'nexl sources dir must be a non empty string';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.NEXL_SOURCES_ENCODING] = (val) => {
	if (AVAILABLE_ENCODINGS.indexOf(val) < 0) {
		return 'nexl sources encoding must be one of the following : [' + AVAILABLE_ENCODINGS.join(',') + ']';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.HTTP_TIMEOUT] = (val) => {
	val = parseInt(val);
	if (!j79.isNumber(val) || val < 0 || !Number.isInteger(val)) {
		return 'HTTP timeout must be a positive integer';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.LDAP_URL] = () => true;
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.HTTP_BINDING] = (val) => {
	if (!j79.isString(val)) {
		return 'HTTP binding must be a string';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.HTTP_PORT] = (val) => {
	val = parseInt(val);
	if (!j79.isNumber(val) || val < 0 || !Number.isInteger(val)) {
		return 'HTTP port be a positive integer';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.HTTPS_BINDING] = (val) => {
	if (val !== undefined && !j79.isString(val)) {
		return 'HTTPS binding must be a string';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.HTTPS_PORT] = (val) => {
	if (val === undefined || val === '') {
		return;
	}

	val = parseInt(val);
	if (!j79.isNumber(val) || val < 0 || !Number.isInteger(val)) {
		return 'HTTPS port must be a positive integer';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.SSL_CERT_LOCATION] = (val) => {
	if (val !== undefined && j79.isString(val) && val.length < 1) {
		return 'SSL certificate location must be a non empty string';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.SSL_KEY_LOCATION] = (val) => {
	if (val !== undefined && j79.isString(val) && val.length < 1) {
		return 'SSL key location must be a non empty string';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.LOG_FILE_LOCATION] = (val) => {
	if (!j79.isString(val) || val.length < 1) {
		return 'Log file location must be a nont empty string';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.LOG_LEVEL] = (val) => {
	if (!j79.isString(val) && logger.getAvailLevels().indexOf(val) < 0) {
		return 'Log level must be of the following : [' + logger.getAvailLevels().join(',') + ']';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.LOG_ROTATE_FILE_SIZE] = (val) => {
	val = parseInt(val);
	if (!j79.isNumber(val) || val < 0 || !Number.isInteger(val)) {
		return 'Log rotate file size must be a positive integer';
	}
};
VALIDATION_SCHEMAS[CONF_FILES.SETTINGS][SETTINGS.LOG_ROTATE_FILES_COUNT] = (val) => {
	val = parseInt(val);
	if (!j79.isNumber(val) || val < 0 || !Number.isInteger(val)) {
		return 'Log rotate files count must be a positive integer';
	}
};

// --------------------------------------------------------------------------------
// TOKENS validations
VALIDATION_SCHEMAS[CONF_FILES.TOKENS] = {
	'*': (val) => {
		if (!j79.isString(val) || val.length < 1) {
			return 'Each token item must be a non empty string';
		}
	}
};


// --------------------------------------------------------------------------------
// PASSWORDS validations
VALIDATION_SCHEMAS[CONF_FILES.PASSWORDS] = {
	'*': (val) => {
		if (!j79.isString(val) || val.length < 1) {
			return 'Each password item must be a non empty string';
		}
	}
};


// --------------------------------------------------------------------------------
// ADMINS validations
VALIDATION_SCHEMAS[CONF_FILES.ADMINS] = [
	(val) => {
		if (!j79.isString(val) || val.length < 1) {
			return 'Each admin item must be a non empty string';
		}
	}
];


// --------------------------------------------------------------------------------
// PERMISSIONS validations
VALIDATION_SCHEMAS[CONF_FILES.PERMISSIONS] = {
	'*': {
		read: (val) => {
			if (!j79.isBool(val)) {
				return '[read] items must of a boolean type';
			}
		},
		write: (val) => {
			if (!j79.isBool(val)) {
				return '[write] items must of a boolean type';
			}
		}
	}
};


// --------------------------------------------------------------------------------
// api

function getConfFileFullPath(fileName) {
	return path.join(NEXL_HOME_DIR, fileName);
}

function substDefValues(defValue) {
	if (j79.isPrimitive(defValue)) {
		return defValue;
	}

	if (j79.isFunction(defValue)) {
		return defValue();
	}

	if (j79.isArray(defValue)) {
		const result = [];
		for (let index in defValue) {
			let item = defValue[index];
			item = substDefValues(item);
			result.push(item);
		}
		return result;
	}

	if (j79.isObject(defValue)) {
		const result = {};
		for (let key in defValue) {
			let val = defValue[key];
			val = substDefValues(val);
			result[key] = val;
		}

		return result;
	}

	throw 'Bad default value';
}

function setupDefaultValues(data, fileName) {
	// setting upd default values for objects only ( there is no way to do this with arrays )
	if (!j79.isObject(data)) {
		return data;
	}

	const defValues = substDefValues(DEF_VALUES[fileName]);

	// iterating over defValues
	for (let key in defValues) {
		if (data[key] !== undefined) {
			continue;
		}

		data[key] = defValues[key];
	}

	return data;
}

function loadInnerInner(fullPath, fileName) {
	return fsx.readFile(fullPath, {encoding: ENCODING_UTF8}).then(
		(fileBody) => {
			// JSONing. The JSON must be an object which contains config version and the data itself
			let conf;
			try {
				conf = JSON.parse(fileBody);
			} catch (e) {
				logger.log.error('The [%s] config file is damaged or broken. Reason : [%s]', fullPath, e.toString());
				return Promise.reject('Config file is damaged or broken');
			}

			const version = conf['version'];
			const data = conf['data'];

			logger.log.debug('The [%s] file is loaded. Config version is [%s]', fullPath, version);

			// completing default values
			let result = setupDefaultValues(data, fileName);

			// updating cache
			CACHE[fileName] = result;

			return Promise.resolve(result);
		});
}

function isConfFileDeclared(fileName) {
	for (let key in CONF_FILES) {
		if (CONF_FILES[key] === fileName) {
			return true;
		}
	}

	return false;
}

function loadInner(fileName) {
	logger.log.debug('Loading config from [%s] file', fileName);

	if (!isConfFileDeclared(fileName)) {
		logger.log.error('The [%s] file is undeclared and cannot be loaded');
		return Promise.reject('Undeclared configuration file cannot be loaded');
	}

	const fullPath = getConfFileFullPath(fileName);

	return Promise.resolve(fullPath).then(fsx.exists).then(
		(isExists) => {
			if (isExists) {
				logger.log.debug('The [%s] file exists', fileName);
				return loadInnerInner(fullPath, fileName);
			}

			return new Promise(
				(resolve, reject) => {
					logger.log.debug('The [%s] file doesn\'t exist. Loading empty data', fullPath);

					// applying default values
					let result = substDefValues(DEF_VALUES[fileName]);

					// updating cache
					CACHE[fileName] = result;

					resolve(result)
				});
		});
}

function load(fileName) {
	// is cached ?
	if (CACHE[fileName] !== undefined) {
		logger.log.debug('Loading [%s] from cache', fileName);
		let data = CACHE[fileName];
		data = setupDefaultValues(data, fileName);
		return Promise.resolve(data);
	}

	logger.log.debug('The [%s] file is not in cache. Loading from file', fileName);
	return loadInner(fileName);
}


function save(data, fileName) {
	logger.log.debug('Saving config to [%s] file', fileName);

	if (!isConfFileDeclared(fileName)) {
		logger.log.error('The [%s] file is undeclared and cannot be saved', fileName);
		return Promise.reject('Undeclared configuration file cannot be saved');
	}

	const fullPath = getConfFileFullPath(fileName);
	const schema = VALIDATION_SCHEMAS[fileName];

	return schemaValidation(data, schema).then(
		() => {
			let conf = {
				version: version,
				data: data
			};

			try {
				conf = JSON.stringify(conf, null, 2);
			} catch (e) {
				logger.log.error('Failed to stringify object while saving the [%s] file. Reason : [%s]', fullPath, utils.formatErr(e));
				return Promise.reject('Bad data format');
			}

			// updating cache
			CACHE[fileName] = data;

			// saving...
			return fsx.writeFile(fullPath, conf, {encoding: ENCODING_UTF8});
		});
}

function loadSettings() {
	return load(CONF_FILES.SETTINGS);
}

function saveSettings(settings) {
	return save(settings, CONF_FILES.SETTINGS);
}

function init() {
	let cmdLineOpts = cmdLineArgs.init();
	NEXL_HOME_DIR = cmdLineOpts[cmdLineArgs.NEXL_HOME_DEF] || path.join(osHomeDir(), '.nexl');
}

function isConfFileExists(fileName) {
	return fsx.join(NEXL_HOME_DIR, fileName).then(fsx.exists);
}

function initSettings() {
	logger.log.debug('Initializing settings');

	return isConfFileExists(CONF_FILES.SETTINGS).then(
		(isExists) => {
			return loadSettings().then(
				(settings) => {
					if (isExists) {
						return Promise.resolve();
					} else {
						return saveSettings(settings);
					}
				});
		});
}

function initTokens() {
	logger.log.debug('Initializing tokens');

	return isConfFileExists(CONF_FILES.TOKENS).then(
		(isExists) => {
			if (!isExists) {
				logger.log.info('The [%s] file doesn\'t exist in [%s] directory. Creating a new one and generating token for [%s] user', CONF_FILES.TOKENS, NEXL_HOME_DIR, utils.ADMIN_USERNAME);
				logger.log.info('\n\n------> Use a token stored in [%s] file located in [%s] directory to register a [%s] account\n\n', CONF_FILES.TOKENS, NEXL_HOME_DIR, utils.ADMIN_USERNAME);
				return security.generateTokenAndSave(utils.ADMIN_USERNAME);
			}
		}
	)
}

function initPermissions() {
	logger.log.debug('Initializing permissions');

	return isConfFileExists(CONF_FILES.PERMISSIONS).then(
		(isExists) => {
			if (!isExists) {
				logger.log.info('The [%s] file doesn\'t exist in [%s] directory. Creating a new one with a default permissions for [%s] user', CONF_FILES.PERMISSIONS, NEXL_HOME_DIR, utils.UNAUTHORIZED_USERNAME);
				const permission = {};
				permission[utils.UNAUTHORIZED_USERNAME] = {
					read: true,
					write: true
				};
				return save(permission, CONF_FILES.PERMISSIONS);
			}
		}
	)
}

function initPasswords() {
	logger.log.debug('Initializing passwords');

	// preloading passwords to store them in cache
	return load(CONF_FILES.PASSWORDS);
}

function initAdmins() {
	logger.log.debug('Initializing admins conf');

	return isConfFileExists(CONF_FILES.ADMINS).then(
		(isExists) => {
			if (!isExists) {
				logger.log.info('The [%s] file doesn\'t exist in [%s] directory. Creating a new one with a [%s] user', CONF_FILES.ADMINS, NEXL_HOME_DIR, utils.ADMIN_USERNAME);
				const admins = [utils.ADMIN_USERNAME];
				return save(admins, CONF_FILES.ADMINS);
			}
		}
	)
}

function createNexlHomeDirectoryIfNeeded() {
	return fsx.exists(NEXL_HOME_DIR).then(
		(isExists) => {
			if (isExists) {
				return fsx.stat(NEXL_HOME_DIR).then(
					(stat) => {
						if (stat.isDirectory()) {
							logger.log.debug('The [%s] nexl home directory exists', NEXL_HOME_DIR);
							return Promise.resolve();
						} else {
							logger.log.error('The [%s] nexl home directory points to existing file ( or something else ). Recreate it as a directory or use another nexl home directory in the following way :\nnexl --nexl-home=/path/to/nexl/home/directory', NEXL_HOME_DIR);
							return Promise.reject('nexl home directory probably points to existing file or something else');
						}
					});
			}

			return fsx.mkdir(NEXL_HOME_DIR).then(
				() => {
					logger.log.info('The [%s] nexl home dir has been created', NEXL_HOME_DIR);
					return Promise.resolve();
				});
		});
}

function createNexlSourcesDirIfNeeded() {
	return loadSettings().then(
		(settings) => {
			const nexlSourcesDir = settings[SETTINGS.NEXL_SOURCES_DIR];
			return fsx.exists(nexlSourcesDir).then(
				(isExists) => {
					if (!isExists) {
						logger.log.info('The [%s] nexl sources dir doesn\'t exist. Creating...', nexlSourcesDir);
						return fsx.mkdir(nexlSourcesDir);
					}

					return fsx.stat(nexlSourcesDir).then(
						(stat) => {
							if (stat.isDirectory()) {
								logger.log.debug('The [%s] nexl sources dir exists', nexlSourcesDir);
								return Promise.resolve();
							} else {
								logger.log.error('The [%s] nexl sources directory points to existing file ( or something else ). Recreate it as a directory or use another nexl sources directory ', nexlSourcesDir);
								return Promise.reject('nexl sources directory probably points to existing file or something else');
							}
						}
					);
				}
			);
		}
	);
}


// --------------------------------------------------------------------------------
module.exports.ENCODING_UTF8 = ENCODING_UTF8;
module.exports.CONF_FILES = CONF_FILES;
module.exports.SETTINGS = SETTINGS;
module.exports.AVAILABLE_ENCODINGS = AVAILABLE_ENCODINGS;

module.exports.init = init;
module.exports.createNexlHomeDirectoryIfNeeded = createNexlHomeDirectoryIfNeeded;
module.exports.createNexlSourcesDirIfNeeded = createNexlSourcesDirIfNeeded;
module.exports.initSettings = initSettings;
module.exports.initTokens = initTokens;
module.exports.initPermissions = initPermissions;
module.exports.initPasswords = initPasswords;
module.exports.initAdmins = initAdmins;

module.exports.load = load;
module.exports.save = save;

module.exports.loadSettings = loadSettings;
module.exports.saveSettings = saveSettings;

module.exports.getNexlHomeDir = () => NEXL_HOME_DIR;
module.exports.getNexlSourcesDir = () => CACHE[CONF_FILES.SETTINGS][SETTINGS.NEXL_SOURCES_DIR];
module.exports.getNexlSettingsCached = () => CACHE[CONF_FILES.SETTINGS];

module.exports.invalidateCache = (fileName) => CACHE[fileName] = undefined;
// --------------------------------------------------------------------------------

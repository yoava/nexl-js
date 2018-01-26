const fs = require('fs');
const path = require('path');
const util = require('util');

const settings = require('./settings');
const security = require('./security');

const CHILD_ITEM = [
	{
		label: 'Loading...',
		disabled: true
	}
];

function sortFilesFunc(a, b) {
	if (a.label.toUpperCase() > b.label.toUpperCase()) {
		return 1;
	}
	if (a.label.toUpperCase() < b.label.toUpperCase()) {
		return -1;
	}
	return 0;
}

function validateRelativePath(relativePath) {
	if (relativePath.search('((\\\\|/)\\.+(\\\\|/))|(^\\.{2,})|(\\.+$)') > -1) {
		throw 'Unacceptable path';
	}
}

function assembleItems(relativePath, nexlSourcesDir, items) {
	var files = [];
	var dirs = [];

	items.forEach(function (name) {
		var itemRelativePath = path.join(relativePath, name);
		validateRelativePath(itemRelativePath);

		var fullPath = path.join(nexlSourcesDir, itemRelativePath);

		var item = {
			label: name,
			value: {
				relativePath: itemRelativePath
			}
		};

		// is directory ?
		if (fs.statSync(fullPath).isDirectory()) {
			item.value.mustLoadChildItems = true;
			item.value.isDir = true;
			item.items = CHILD_ITEM.slice();
			dirs.push(item);
			return;
		}

		// is file ?
		if (fs.statSync(fullPath).isFile()) {
			item.value.mustLoadChildItems = false;
			item.value.isDir = false;
			files.push(item);
			return;
		}
	});

	// sorting files and dirs
	files = files.sort(sortFilesFunc);
	dirs = dirs.sort(sortFilesFunc);

	return [].concat(dirs).concat(files);
}

function getNexlSources(relativePath) {
	return new Promise(function (resolve, reject) {
		validateRelativePath(relativePath);

		var nexlSourcesRootDir = settings.get(settings.NEXL_SOURCES_DIR);
		var path2Scan = path.join(nexlSourcesRootDir, relativePath || '');
		validateRelativePath(path2Scan);

		if (!fs.existsSync(path2Scan)) {
			throw util.format('The [%s] directory doesn\'t exist', relativePath);
		}

		fs.readdir(path2Scan, function (err, items) {
			if (err) {
				reject(err);
				return;
			}

			items = assembleItems(relativePath, nexlSourcesRootDir, items);
			resolve(items);
		});
	});
}

// --------------------------------------------------------------------------------
module.exports.getNexlSources = getNexlSources;
// --------------------------------------------------------------------------------

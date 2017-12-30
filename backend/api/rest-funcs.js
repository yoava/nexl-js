const fs = require('fs');
const path = require('path');

const DIR_ICON = '/nexl/site/images/dir.png';
const DIR_RO_ICON = '/nexl/site/images/dir.png';

const FILE_ICON = '/nexl/site/images/js-file.png';
const FILE_RO_ICON = '/nexl/site/images/js-file-read-only.png';

const LOADING_ITEM = [
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

function hasReadPermission(fileName) {
	return true;
}

function hasWritePermission(fileName) {
	return true;
}

function assignIcons(fileName, item, files, dirs) {
	// is directory ?
	if (fs.statSync(fileName).isDirectory()) {
		item['icon'] = hasWritePermission(fileName) ? DIR_ICON : DIR_RO_ICON;
		item['items'] = LOADING_ITEM.slice();
		dirs.push(item);
		return;
	}

	// is file ?
	if (fs.statSync(fileName).isFile()) {
		item['icon'] = hasWritePermission(fileName) ? FILE_ICON : FILE_RO_ICON;
		files.push(item);
		return;
	}
}

function getNexlSources() {
	return new Promise(function (resolve, reject) {
		var dir = 'c:\\temp';

		fs.readdir(dir, function (err, items) {
			if (err) {
				reject(err);
				return;
			}

			var files = [];
			var dirs = [];

			for (var index in items) {
				var name = items[index];
				var fullPath = path.join(dir, name);

				if (!hasReadPermission(fullPath)) {
					continue;
				}

				var item = {};
				item['label'] = name;
				item['path'] = fullPath;
				assignIcons(fullPath, item, files, dirs);
			}

			// sorting files and dirs
			files = files.sort(sortFilesFunc);
			dirs = dirs.sort(sortFilesFunc);

			// concatenating them and substituting
			resolve([].concat(dirs).concat(files));
		});
	});
}

// --------------------------------------------------------------------------------
module.exports.getNexlSources = getNexlSources;
// --------------------------------------------------------------------------------

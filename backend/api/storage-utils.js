const path = require('path');
const j79 = require('j79-utils');

const fsx = require('./fsx');
const logger = require('./logger');
const confMgmt = require('./conf-mgmt');
const confConsts = require('../common/conf-constants');
const uiConsts = require('../common/ui-constants');
const di = require('../common/data-interchange-constants');
const resolveSearchFunc = require('../common/find-in-files');
const utils = require('./utils');

// todo : allow to configure
const MAX_FIND_IN_FILES_OCCURRENCES = 1000;

let TREE_ITEMS = [];

function sortFilesFunc(a, b) {
	if (a.label.toUpperCase() > b.label.toUpperCase()) {
		return 1;
	}
	if (a.label.toUpperCase() < b.label.toUpperCase()) {
		return -1;
	}
	return 0;
}

function assembleStorageFilePath(relativePath) {
	if (!utils.isFilePathValid(relativePath)) {
		logger.log.error('The [%s] path is unacceptable', relativePath);
		return Promise.reject('Unacceptable path');
	}

	const fullPath = path.join(confMgmt.getNexlStorageDir(), relativePath || '');

	if (!utils.isFilePathValid(fullPath)) {
		logger.log.error('The [%s] path is unacceptable', fullPath);
		return Promise.reject('Unacceptable path');
	}

	return Promise.resolve(fullPath);
}

function assembleStorageDirPath(relativePath) {
	if (!utils.isDirPathValid(relativePath)) {
		logger.log.error('The [%s] path is unacceptable', relativePath);
		return Promise.reject('Unacceptable path');
	}

	const fullPath = path.join(confMgmt.getNexlStorageDir(), relativePath || '');

	if (!utils.isDirPathValid(fullPath)) {
		logger.log.error('The [%s] path is unacceptable', fullPath);
		return Promise.reject('Unacceptable path');
	}

	return Promise.resolve(fullPath);
}

function loadFileFromStorage(relativePath) {
	return assembleStorageFilePath(relativePath).then(
		(fullPath) => {
			return fsx.exists(fullPath).then(
				(isExists) => {
					if (!isExists) {
						logger.log.error('The [%s] JavaScript file doesn\'t exist', fullPath);
						return Promise.reject('JavaScript file doesn\'t exist !');
					}

					const encoding = confMgmt.getNexlSettingsCached()[confConsts.SETTINGS.STORAGE_FILES_ENCODING];
					return fsx.readFile(fullPath, {encoding: encoding});
				});
		}
	);
}

function saveFileToStorageInnerInner(fullPath, content) {
	const data = {};

	const encoding = confMgmt.getNexlSettingsCached()[confConsts.SETTINGS.STORAGE_FILES_ENCODING];

	return fsx.writeFile(fullPath, content, {encoding: encoding})
		.then(_ => fsx.stat(fullPath))
		.then(stat => Promise.resolve(data[di.FILE_LOAD_TIME] = stat.mtime.getTime()))
		.then(cacheStorageFiles)
		.then(_ => data);
}

function saveFileToStorageInner(fullPath, content, fileLoadTime) {
	if (fileLoadTime === undefined) {
		return saveFileToStorageInnerInner(fullPath, content);
	}

	// comparing fileLoadTime to last file modification time
	return fsx.stat(fullPath)
		.then(stat => {
			if (fileLoadTime >= stat.mtime.getTime()) {
				// file was modified on server before the fileLoadTime, just saving...
				return saveFileToStorageInnerInner(fullPath, content);
			}

			// file on the server was modified after it was opened by client
			// sending back newer file content
			const encoding = confMgmt.getNexlSettingsCached()[confConsts.SETTINGS.STORAGE_FILES_ENCODING];
			return fsx.readFile(fullPath, {encoding: encoding})
				.then(newerFileContent => {
					const data = {};
					data[di.FILE_BODY] = newerFileContent;
					data[di.FILE_LOAD_TIME] = stat.mtime.getTime();
					return data;
				});
		});
}

function saveFileToStorage(relativePath, content, fileLoadTime) {
	return assembleStorageFilePath(relativePath)
		.then(fullPath => {
			return saveFileToStorageInner(fullPath, content, fileLoadTime);
		});
}

function mkdir(relativePath) {
	return assembleStorageFilePath(relativePath).then(
		(fullPath) => {
			return fsx.exists(fullPath).then((isExists) => {
				if (isExists) {
					logger.log.error('The [%s] directory or file already exists', fullPath);
					return Promise.reject('Directory or file already exists');
				}

				return fsx.mkdir(fullPath);
			});
		})
		.then(cacheStorageFiles);
}

function deleteItem(relativePath) {
	return assembleStorageFilePath(relativePath)
		.then(fsx.deleteItem)
		.then(cacheStorageFiles);
}

function rename(oldRelativePath, newRelativePath) {
	return assembleStorageFilePath(newRelativePath).then(
		(newFullPath) => {
			return fsx.exists(newFullPath).then(
				(isExists) => {
					if (isExists) {
						logger.log.error('Cannot rename a [%s] to [%s] because the [%s] already exists', oldRelativePath, newRelativePath, newRelativePath);
						return Promise.reject('Item with the same name already exists');
					}

					return assembleStorageFilePath(oldRelativePath).then(
						(oldFullPath) => {
							return fsx.rename(oldFullPath, newFullPath);
						}
					);

				}
			);
		}
	)
		.then(cacheStorageFiles);
}

function moveInner(sourceStuff, destStuff) {
	return fsx.exists(sourceStuff).then(
		(isSrcExists) => {
			if (!isSrcExists) {
				logger.log.error('Failed to move a [%s] source item to [%s] destination item. Reason : source item doesn\'t exist', sourceStuff, destStuff);
				return Promise.reject('Source item doesn\'t exist');
			}

			const destItem = path.join(destStuff, path.basename(sourceStuff));

			return fsx.exists(destItem).then(
				(isDestExists) => {
					if (isDestExists) {
						logger.log.error('Failed to move a [%s] source item to [%s] destination item. Reason : destination item already exists', sourceStuff, destItem);
						return Promise.reject('Destination item already exist');
					}

					// moving...
					return fsx.move(sourceStuff, destItem);
				}
			);
		}
	);
}

function move(source, dest) {
	const data = {};
	return assembleStorageFilePath(source)
		.then(sourceFullPath => Promise.resolve(data.sourceFullPath = sourceFullPath))
		.then(_ => assembleStorageDirPath(dest))
		.then(destFullPath => Promise.resolve(data.destFullPath = destFullPath))
		.then(_ => moveInner(data.sourceFullPath, data.destFullPath))
		.then(cacheStorageFiles);
}

function listDirItems(fullPath) {
	const dirItems = [];
	const fileItems = [];

	return fsx.readdir(fullPath)
		.then(items => {
			const promises = [];

			items.forEach(item => {
				const itemFullPath = path.join(fullPath, item);
				const promise = fsx.stat(itemFullPath)
					.then(itemStat => {
						if (itemStat.isDirectory()) {
							dirItems.push(item);
						}

						if (itemStat.isFile()) {
							fileItems.push(item);
						}
					});

				promises.push(promise);
			});

			return Promise.all(promises)
				.then(items => {
					return Promise.resolve({
						dirs: dirItems,
						files: fileItems
					});
				});
		});
}

function makeDirItem(item, relativePath, subDirItems) {
	return {
		label: item,
		items: subDirItems,
		icon: uiConsts.DIR_ICON,
		value: {
			relativePath: path.join(relativePath, item),
			label: item,
			mustLoadChildItems: false,
			isDir: true
		}
	};
}

function makeFileItem(item, relativePath) {
	return {
		label: item,
		icon: uiConsts.FILE_ICON,
		value: {
			relativePath: path.join(relativePath, item),
			label: item,
			mustLoadChildItems: false,
			isDir: false
		}
	};
}

function gatherAllFiles(relativePath) {
	relativePath = relativePath || '';
	relativePath = path.join(path.sep, relativePath);
	const searchFrom = path.join(confMgmt.getNexlStorageDir(), relativePath);

	if (!utils.isDirPathValid(searchFrom)) {
		logger.log.error(`Got unacceptable path [${searchFrom}]. This path is invalid or points outside a nexl JavaScript files root dir`);
		return Promise.reject('Unacceptable path');
	}

	const dirItems = [];
	return listDirItems(searchFrom)
		.then(currentDirItems => {

			// iterating over dir items and resolving sub dir items with promises
			const promises = [];
			currentDirItems.dirs.forEach(item => {
				const subDirRelativePath = path.join(relativePath, item);
				const promise = gatherAllFiles(subDirRelativePath)
					.then(subDirItems => {
						const dirItem = makeDirItem(item, relativePath, subDirItems);
						dirItems.push(dirItem);
					});
				promises.push(promise);
			});

			// running promises to resolve sub dir items
			return Promise.all(promises)
				.then(x => {
					dirItems.sort(sortFilesFunc);
					const fileItems = [];

					// now iterating over file items
					currentDirItems.files.forEach(item => {
						const fileItem = makeFileItem(item, relativePath);
						fileItems.push(fileItem);
					});

					fileItems.sort(sortFilesFunc);

					return Promise.resolve(dirItems.concat(fileItems));
				});
		});
}

function cacheStorageFiles() {
	const storageDir = confMgmt.getNexlStorageDir();
	logger.log.debug(`Caching files list in [${storageDir}] directory`);

	return gatherAllFiles().then(
		(result) => {
			TREE_ITEMS = result;
			logger.log.debug(`Files are gathered`);
			return Promise.resolve();
		}
	);
}

function gatherFilesList(list, root) {
	for (let index in root) {
		const item = root[index];
		if (item.value.isDir === true) {
			gatherFilesList(list, item.items);
			continue;
		}

		list.push(item.value.relativePath);
	}
}

function findInFiles(searchData) {
	const filesList = [];
	const subDir = findSubDir(searchData[di.RELATIVE_PATH]);
	gatherFilesList(filesList, subDir);

	const searchFunctionData = resolveSearchFunc(searchData);
	searchFunctionData.maxOccurrences = MAX_FIND_IN_FILES_OCCURRENCES;

	const result = {};
	const promises = [];
	let maxOccurrences = MAX_FIND_IN_FILES_OCCURRENCES;

	filesList.forEach(fileName => {
		const fullPath = path.join(confMgmt.getNexlStorageDir(), fileName);

		if (maxOccurrences < 0) {
			return;
		}

		const promise = fsx.readFile(fullPath, {encoding: confConsts.ENCODING_UTF8}).then(fileContent => {

			if (maxOccurrences < 0) {
				return;
			}

			searchFunctionData.fileContent = fileContent;
			const occurrences = searchFunctionData.func(searchFunctionData);
			if (occurrences.length > 0) {
				maxOccurrences--;
				result[fileName] = occurrences;
			}
		});
		promises.push(promise);
	});

	return Promise.all(promises).then(_ => Promise.resolve(result));
}

function findDir(dir, dirName) {
	for (let key in dir) {
		let item = dir[key];

		if (item.value.isDir !== true) {
			continue;
		}

		if (item.value.label === dirName) {
			return item;
		}
	}
}

function findSubDir(relativePath) {
	let normalizedPath = path.normalize(relativePath || '');

	// is root dir ?
	if (normalizedPath === path.sep || normalizedPath === '.') {
		return TREE_ITEMS;
	}

	// trimming slashes
	normalizedPath = normalizedPath.replace(/^[\\/]+|[\\/]+$/g, '');

	// searching for target dir
	const pathItems = normalizedPath.split(path.sep);
	let dir = TREE_ITEMS;

	for (let index in pathItems) {
		dir = findDir(dir, pathItems[index]);

		// relativePath doesn't exist
		if (dir === undefined) {
			return Promise.resolve({});
		}

		dir = dir.items;
	}

	return dir;
}

function listFiles(relativePath) {
	const subDir = findSubDir(relativePath);
	const result = [];
	subDir.forEach(item => {
		if (item === undefined) {
			return;
		}
		if (item.value.isDir !== true) {
			result.push(item.value.label);
		}
	});

	return result;
}

function listDirs(relativePath) {
	const subDir = findSubDir(relativePath);
	const result = [];
	subDir.forEach(item => {
		if (item === undefined) {
			return;
		}

		if (item.value.isDir === true) {
			result.push(item.value.label);
		}
	});

	return result;
}

function listDirsAndFiles(relativePath) {
	const subDir = findSubDir(relativePath);
	const result = [];
	subDir.forEach(item => {
		if (item === undefined) {
			return;
		}

		result.push(item.value.label);
	});

	return result;
}

// --------------------------------------------------------------------------------
module.exports.loadFileFromStorage = loadFileFromStorage;
module.exports.saveFileToStorage = saveFileToStorage;
module.exports.mkdir = mkdir;
module.exports.deleteItem = deleteItem;
module.exports.rename = rename;
module.exports.move = move;
module.exports.findInFiles = findInFiles;

module.exports.listFiles = listFiles;
module.exports.listDirs = listDirs;
module.exports.listDirsAndFiles = listDirsAndFiles;

module.exports.gatherAllFiles = gatherAllFiles;

module.exports.cacheStorageFiles = cacheStorageFiles;
module.exports.getTreeItems = () => TREE_ITEMS;
// --------------------------------------------------------------------------------

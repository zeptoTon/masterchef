/**
 * This class will handle finding out total number of recipes in
 * server and also the total number of pages in server,
 * In the end will output to status.json for static serve.
 */

const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs'));
const path = require('path');

class StatusGenerator {
    constructor() {

    }

    /**
     * Remove existing status file if any.
     * @return Promise
     */
    _removeExistingStatus() {
        const statusPath = path.join(__dirname, 'data', 'status.json');
        return fs.unlinkAsync(statusPath)
            .catch(err => {
                // ENOENT, file not existed ignore.
                if (err.code === 'ENOENT') return;
                throw err;
            });
    }

    /**
     * @Return Number as Pomise
     */
    _findTotalNumberOfRecipes() {
        const recipePath = path.join(__dirname, 'data', 'recipes');
        return fs.readdirAsync(recipePath)
            .then(files => files.length);
    }

    /**
     * @Return Number as Pomise
     */
    _findTotalNumberOfPages() {
        const pagePath = path.join(__dirname, 'data', 'pages');
        return fs.readdirAsync(pagePath)
            .then(files => files.length);
    }


    /**
     * Write status to File
     * @param {Number} numberOfPages
     * @param {Number} numberOfRecipes
     */
    _writeStatusToJSONFile(numberOfPages, numberOfRecipes) {
        const statusPath = path.join(__dirname, 'data', 'status.json');
        return fs.writeFileAsync(statusPath, JSON.stringify({ numberOfPages, numberOfRecipes }))
            .catch(err => { throw err; });
    }

    /**
     * Genereate current status in server
     * @return as Promise.
     */
    generateStatus() {
        return this._removeExistingStatus()
            .then(() => {
                return promise.all([
                    this._findTotalNumberOfPages(),
                    this._findTotalNumberOfRecipes()
                ]).spread(this._writeStatusToJSONFile);
            });
    }
}

module.exports = StatusGenerator;

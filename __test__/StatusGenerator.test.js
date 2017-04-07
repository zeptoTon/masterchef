const StatusGenerator = require('../StatusGenerator');
const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs'));
const path = require('path');

describe('test case on generating files in preprocess stage', () => {
    beforeAll(() => {
        this.generator = new StatusGenerator();
    });
    afterAll(() => {
        let statusPath = path.join(__dirname, '..', 'data', 'status.json');
        return fs.unlinkAsync(statusPath)
            .catch(err => {
                throw err;
            });
    });

    it('can find total number of recipes', () => {
        return this.generator._findTotalNumberOfRecipes().then(result => {
            expect(result).toEqual(expect.anything());
        });
    });

    it('can find total number of pages', () => {
        return this.generator._findTotalNumberOfPages().then(result => {
            expect(result).toEqual(expect.anything());
        });
    });


    it('can generate correct number of pages and recipes', () => {
        const numberOfPages = 1;
        const numberOfRecipes = 2;
        let statusPath = path.join(__dirname, '..', 'data', 'status.json');
        return this.generator._writeStatusToJSONFile(numberOfPages, numberOfRecipes)
            .then(() => {
                // check status.json
                return fs.readFileAsync(statusPath, 'utf8').then(data => {
                    expect(JSON.parse(data)['numberOfPages']).toEqual(1);
                    expect(JSON.parse(data)['numberOfRecipes']).toEqual(2);
                });
            });
    });
});

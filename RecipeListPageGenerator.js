/**
 * Provide Page Generator on Recipe List Page
 */
const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs'));
const path = require('path');

class RecipeListPageGenerator {

    constructor() {

    }
    /**
     * Remove existing generated files
     * @return Promise
     */
    _clearPagesDirectory() {
        let pagePath = path.join(__dirname, 'data', 'pages');
        return fs.readdirAsync(pagePath)
            .then(files => {
                return promise.map(files, filename => {
                    return fs.unlinkAsync(path.join(pagePath, filename))
                        .catch(err => {
                            throw err;
                        });
                });
            });
    }

    /**
     * Read all recipes
     * @return Promise of unsorted recipes array
     */
    _readAllRecipes() {
        const recipePath = path.join(__dirname, '.', 'data', 'recipes');

        return fs.readdirAsync(recipePath)
            .then((files) => {
                return promise.map(files, (filename) => {
                    return fs.readFileAsync(path.join(recipePath, filename), 'utf8')
                        .then(content => {
                            return { filename, content };
                        })
                        .catch(err => {
                            throw err;
                        });
                });
            })
            .then((datas) => {
                return datas.map(({ filename, content }) => {
                    let el = JSON.parse(content);
                    el.name = filename;
                    return el;
                });
            })
            .catch(err => {
                throw err;
            });
    }

    /**
     * Keep only name, cookingTimeInMinutes and ingredient in Object
     * @param {Object} recipe
     * @return {Object} cleaned recipe
     */
    _cleanRecipe(recipe) {
        const keys = ['name', 'cookingTimeInMinutes', 'ingredients'];
        Object.keys(recipe).forEach(key => {
            if (keys.indexOf(key) === -1) delete recipe[key];
        });
        // special handling on ingredients
        recipe.ingredients = recipe.ingredients.map(v => v.name);

        // special handling on recipe name
        recipe.name = recipe.name.replace('.json', '');

        return recipe;
    }
    /**
     * sort recipes by cookingTime
     * @param recipes - unsorted recipes
     * @return sorted recipes
     */
    _sortRecipes(recipes) {
        const key = 'cookingTimeInMinutes';
        return recipes.sort((a, b) => {
            return a[key] - b[key];
        });
    }

    /**
     * generate json files to folder for static serve
     * Each file is in order and max size of 10
     * @param recipes - Array of sorted recipes
     * @return {Promise}
     */
    _writeRecipePages(recipes) {

        const outputFolder = path.join(__dirname, 'data', 'pages');
        const pageSize = 10;
        let index = 0;
        let promises = [];
        while (true) {
            let currentPageContent = recipes.slice(index * pageSize, (index + 1) * pageSize);
            if (currentPageContent.length === 0) break;

            let p = fs.writeFileAsync(path.join(outputFolder, `${index + 1}.json`), JSON.stringify(currentPageContent))
                .catch((err) => {
                    throw err;
                });
            promises.push(p);
            index++;
        }
        return promise.all(promises);
    }

    /**
     * Entry Point of using this class
     * @return as Promise.
     */
    generateRecipeList() {
        return this._clearPagesDirectory()
            .then(this._readAllRecipes)
            .map(this._cleanRecipe)
            .then(this._sortRecipes)
            .then(this._writeRecipePages);
    }
}
module.exports = RecipeListPageGenerator;

const RecipeListPageGenerator = require('../RecipeListPageGenerator');
const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs'));
const path = require('path');

describe('test case on generating files in preprocess stage', () => {
    beforeAll(() => {
        this.generator = new RecipeListPageGenerator();
    });
    afterAll(() => {
        let pagePath = path.join(__dirname, '..', 'data', 'pages');
        return fs.readdirAsync(pagePath)
            .then(files => {
                return promise.map(files, filename => {
                    return fs.unlinkAsync(path.join(pagePath, filename))
                        .catch(err => {
                            throw err;
                        });
                });
            });
    });

    it('can read recipes without error', () => {
        return this.generator._readAllRecipes().then(result => {
            expect(result).toEqual(expect.anything());
        });
    });

    it('contain recipes', () => {
        let expectedResult = [
            {
                'ImageUrl': '', 'cookingTimeInMinutes': 60,
                'ingredients': [{ 'name': 'sugar', 'quantity': '1 tsp' },
                { 'name': 'salt', 'quantity': '1 tsp' }], 'name': 'dummy recipe.json'
            },
            {
                'ImageUrl': '', 'cookingTimeInMinutes': 30,
                'ingredients': [], 'name': 'empty recipe.json'
            }
        ];
        return this.generator._readAllRecipes()
            .then(result => {
                expect(result).toEqual(expect.arrayContaining(expectedResult));
            });
    });

    it('can sort recipe', () => {
        let unsortedRecipes = [
            {
                'cookingTimeInMinutes': 91
            },
            {
                'cookingTimeInMinutes': 90
            }
        ];
        let expectedRecipes = [
            {
                'cookingTimeInMinutes': 90
            },
            {
                'cookingTimeInMinutes': 91
            }
        ];
        expect(this.generator._sortRecipes(unsortedRecipes)).toEqual(expectedRecipes);
    });

    it('can clean recipe', () => {
        let uncleanRecipe = {
            'name': 'a.json',
            'cookingTimeInMinutes': 90,
            'ingredients': [
                { 'name': 'sugar', 'quantity': '1 tsp' },
                { 'name': 'salt', 'quantity': '1 tsp' }
            ],
            'dirtyThing': 'very dirty'
        };
        let expectedResult = {
            'name': 'a',
            'cookingTimeInMinutes': 90,
            'ingredients': ['sugar', 'salt']
        };
        expect(this.generator._cleanRecipe(uncleanRecipe)).toEqual(expectedResult);
    });


    it('can generate correct number of page base on the size of recipe', () => {

        let recipes = [
            {
                'name': 'a1',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'a2',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'a3',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'a4',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'a5',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'a6',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'a7',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'a8',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'a9',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'a10',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'b1',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },
            {
                'name': 'b2',
                'cookingTimeInMinutes': 90,
                'ingredients': ['sugar', 'salt']
            },

        ];
        let pagePath = path.join(__dirname, '..', 'data', 'pages');
        return this.generator._writeRecipePages(recipes)
            .then(() => {
                // check 1.json
                return fs.readFileAsync(path.join(pagePath, '1.json'), 'utf8').then(data => {
                    expect(JSON.parse(data)).toHaveLength(10);
                    expect(JSON.parse(data)[0]['name']).toEqual('a1');
                });
            }).then(() => {
                // check 2.json
                return fs.readFileAsync(path.join(pagePath, '2.json'), 'utf8').then(data => {
                    expect(JSON.parse(data)).toHaveLength(2);
                    expect(JSON.parse(data)[0]['name']).toEqual('b1');
                });
            });
    });


});

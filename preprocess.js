/**
 * This file allow pre processing before running express server
 * We will need to implement generating json file under page folder
 * The genereated files will be serve as static for Frontend fetching.
 */

const RecipeListPageGenerator = require('./RecipeListPageGenerator');

/**
 * main function
 */
(function () {
    if (require.main === module) {
        let generator = new RecipeListPageGenerator();
        generator.generateRecipeList();
    }
})();

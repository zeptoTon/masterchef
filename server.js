const path = require('path');
const express = require('express');

const app = express();
app.set('port', (process.env.PORT || 3001));


app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);// eslint-disable-line no-console
});

/**
 * Express only serves static assets in production,
 * including index.html
 */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('masterchef-client/build'));
}

/**
 * static response of individual recipe file
 */
app.use('/recipes', express.static(path.join(__dirname, 'data/recipes')));

/**
 * static response of recipes list page
 */
app.use('/pages', express.static(path.join(__dirname, 'data/pages')));

/**
 * static response of the current status of server
 */
app.use('/status', express.static(path.join(__dirname, 'data/status.json')));

/**
 * Serve Image
 */
app.use('/images/recipe', express.static(path.join(__dirname, 'images/recipe')));

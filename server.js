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
app.use('/recipe', express.static(path.join(__dirname, 'data/recipes')));


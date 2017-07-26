const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
let config = require('./config');

app.use(bodyParser.json());

/**
 * Register Controllers
 */
app.use('/search', require('./controllers/search'));
app.use('/stats', require('./controllers/stats'));

/**
 * Set static asset path
 */
var assetPath = (config.env.toLowerCase() === 'production') ? 'dist' : 'public';
assetPath = path.resolve(__dirname, '..', 'client', assetPath);
app.use(express.static(assetPath));
console.log(`Wine-Search in ${config.env} mode, serving ${assetPath}`);


app.listen(config.port, function () {
  console.log(`Wine-Search app listening on port ${config.port}`);
  require('./lib/dataUpdate');
});
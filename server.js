const express = require('express');
const path    = require('path');
const open    = require('open');
const chalk   = require('chalk');
const serveWebpackClient = require('serve-webpack-client');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(serveWebpackClient({
  distPath: path.join(__dirname, 'dist'),
  indexFilename: 'index.html',
  webpackConfig: require('./webpack.config')
}));

app.listen(PORT, (err) => {
  if (err) {
    console.log(chalk.red(err));
    return;
  }

  console.log(`Listening on port ${ chalk.yellow(PORT) }`);
  open(`http://localhost:${PORT}`);
});

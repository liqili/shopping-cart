const express = require('express');
const path = require('path');
const webpack = require('webpack');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({
    changeOrigin: true
});
const app = express();
const port = 3000;
const isProduction = process.env.NODE_ENV === 'production';
const webpackConfig = isProduction ? require('./webpack.production.config') : require('./webpack.dev.config.js');

const products = require('./data/products.json');


const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/images', express.static(path.join(__dirname, 'assets', 'images')));

app.get('/rest/products', function (req, res) {
    res.contentType('application/json');
    res.status(200).send(products);
});

app.all('/rest/purchase', function (req, res) {
    res.contentType('application/json');
    res.status(200).send(products);
})

app.get('/rest/containerid', function (req, res) {
    res.contentType('application/json');
    res.status(200).send({ip: "127.0.0.1", host: "localhost"});
})

app.all('/rest/*', function (req, res) {
    res.contentType('application/json');
    res.status(200);
});


proxy.on('error', function (e) {
    console.log('Could not connect to proxy, please try again...');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

// And run the server
app.listen(port, function () {
    console.log('Server running on port ' + port);
});

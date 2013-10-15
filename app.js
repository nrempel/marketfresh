var express = require('express');
var mongoose = require('mongoose');

var appController = require('./controllers/app.js');
var marketsController = require('./controllers/markets.js');

var app = module.exports = express();

// Config
var config = {
    name: 'marketfresh',
    publicPath: '/public',
    viewPath: '/views',
    rootDir: __dirname,
};

// Mongoose setup
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/marketfresh');

// Setup
app.set('port', process.env.PORT || 5000);
app.set('views', config.rootDir + config.viewPath);
app.set('view engine', 'jade');
app.use(express.compress());
app.use(express.favicon(config.rootDir + config.publicPath + '/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware(config.rootDir + config.publicPath));
app.use(express['static'](config.rootDir + config.publicPath));

// Some dev stuff
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Redirect www to bare domain
app.use(function(req, res, next) {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect(301, 'http://'+req.headers.host.replace(/^www\./, '')+req.url);
}
    else { next(); }
});

// App Routes
app.get('/', appController.index);
app.get('/applets/:name', appController.applets);

// Markets Routes
app.get('/api/v1/markets', marketsController.list);
app.get('/api/v1/markets/:slug', marketsController.show)
app.post('/api/v1/markets', marketsController.create);

// Catch-all
app.get('*', appController.index);

// Run
app.listen(app.get('port'));
console.log('Started '+config.name+' on port ' + app.get('port'));
console.log('Config used: ', config);

var Market = require('../models/market.js');

exports.create = function(req, res) {
    new Market({
        title: req.body.title,
        author: req.body.address
    }).save();
};
 
exports.list = function(req, res) {
    Market.find(function(err, threads) {
        res.send(threads);
    });
};
 
exports.show = function(req, res) {
    Market.findOne({slug: req.params.slug}, function(err, threads) {
        res.send(threads);
    });
};

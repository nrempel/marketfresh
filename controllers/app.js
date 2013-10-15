exports.index = function(req, res) {
    res.render('app')
};

exports.applets = function (req, res) {
    var name = req.params.name;
    res.render('applets/' + name);
};
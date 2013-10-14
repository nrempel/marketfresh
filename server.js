var restify = require('restify');
var server = restify.createServer();

server.listen(4321, function() {
  console.log('%s listening at %s', server.name, server.url);
});
var http = require('http');
var server = http.createServer(require('./handleRequest'));
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/urls');

server.listen(process.env.PORT || 5000);

module.exports = server;

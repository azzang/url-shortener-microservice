var http = require('http');
var server = http.createServer(require('./handleRequest'));
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);

server.listen(process.env.PORT || 5000);

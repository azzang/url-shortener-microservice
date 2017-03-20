const http = require('http');
const server = http.createServer(require('./handleRequest'));
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);

server.listen(process.env.PORT || 5000);

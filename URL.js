var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var URLSchema = new Schema({
  value: String
});

mongoose.Promise = require('bluebird');

autoIncrement.initialize(mongoose.createConnection(process.env.MONGOLAB_URI));

URLSchema.plugin(autoIncrement.plugin, 'URL');

module.exports = mongoose.model('URL', URLSchema);

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
const URLSchema = new Schema({
  value: String,
});

mongoose.Promise = require('bluebird');

autoIncrement.initialize(mongoose.createConnection(process.env.MONGOLAB_URI));

URLSchema.plugin(autoIncrement.plugin, 'URL');

module.exports = mongoose.model('URL', URLSchema);

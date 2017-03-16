var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function getSecondsSinceAppCreation(now) {
  var creation =  new Date('March 16, 2017 13:30:00').getTime();
  return Math.floor((now - creation) / 1000);
};

var urlSchema = new Schema({
  original: String,
  shortened: { type: Number, set: getSecondsSinceAppCreation }
});

module.exports = mongoose.model('Url', urlSchema);

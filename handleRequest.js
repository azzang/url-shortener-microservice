var validator = require('validator');
var Url = require('./models/url');

function getPrettyJSON(obj) {
  return JSON.stringify(obj, null, 3);
}

function handleResponse(err, res, original, shortened) {
  res.setHeader('Content-Type', 'application/json');
  if (err) {
    res.statusCode = 400;
    res.end(getPrettyJSON({ error: err.message }));
  } else {
    res.end(getPrettyJSON({
      original_url: original,
      short_url: `localhost:5000/${shortened}`
    }));
  }
}

function handleURLCreation(err, url) {
  if (err) return handleResponse(err, this.res);
  handleResponse(null, this.res, this.original, url.shortened);
}

function handleSearchForOriginal(err, url) {
  if (err) return handleResponse(err, this.res);
  if (url) return handleResponse(null, this.res, this.original, url.shortened);
  Url.create({ original: this.original, shortened: Date.now() }, handleURLCreation.bind(this));
}

function handleSearchForShortened(err, url) {
  if (err) return handleResponse(err, this.res);
  this.res.writeHead(302, { Location: url.original });
  this.res.end();
}

module.exports = function(req, res) {
  var original = req.url.slice(1);
  if (validator.isURL(original))
    return Url.findOne({ original: original }, handleSearchForOriginal.bind({ res, original }));
  if (/^\d+$/.test(original))
    return Url.findOne({ shortened: original }, handleSearchForShortened.bind({ res, original }));
  handleResponse(new Error('Wrong url format, make sure you have a valid protocol and real site.'), res);
};

const validator = require('validator');
const URL = require('./URL');

const invalidURLMessage = 'Wrong url format, make sure you have a valid protocol and real site.';
const baseURL = 'https://peaceful-caverns-18407.herokuapp.com';

function sendJSON(err, res, urlValue, urlId) {
  res.setHeader('Content-Type', 'application/json');
  if (err) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: err.message }, null, 3));
  }
  res.end(JSON.stringify({
    original_url: urlValue,
    short_url: `${baseURL}/${urlId}`,
  }, null, 3));
}

function sendURLs(err, url) {
  if (err) return sendJSON(err, this.res);
  if (url) return sendJSON(null, this.res, url.value, url._id);
  URL.create({ value: this.value }, sendURLs.bind(this));
}

function redirect(err, url) {
  if (err) return sendJSON(err, this);
  if (!url) return sendJSON(new Error(invalidURLMessage), this);
  this.writeHead(302, { Location: url.value });
  this.end();
}

module.exports = (req, res) => {
  const url = req.url.slice(1);
  if (validator.isURL(url)) return URL.findOne({ value: url }, sendURLs.bind({ res, value: url }));
  if (/^\d+$/.test(url)) return URL.findById(url, redirect.bind(res));
  sendJSON(new Error(invalidURLMessage), res);
};

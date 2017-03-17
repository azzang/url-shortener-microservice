# URL Shortener Microservice
## Functionality:
* returns a "shortened" URL when passed a [valid URL] as a parameter
* returns a 400 Error if an invalid URL is passed
* redirects to original URL if shortened URL is passed

## Example:
#### Passing a Valid URL:
 ``https://peaceful-caverns-18407.herokuapp.com/https://www.google.com``
#### Response:
{ "original_url": "https://www.google.com", "short_url": "https://peaceful-caverns-18407.herokuapp.com/1" }

[valid URL]: https://github.com/chriso/validator.js

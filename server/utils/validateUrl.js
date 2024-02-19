const validator = require("validator")

 function validateUrl(url) {
    if(!url) return false;
    return validator.isURL(url)
}

module.exports = validateUrl
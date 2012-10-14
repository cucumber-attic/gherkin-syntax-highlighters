/**
 * Creates a connect middleware for loading sources (typically for browsers).
 */
module.exports = function(path) {
    var static = require('connect').static(__dirname);

    return function(req, res, next) {
        if(req.url.indexOf(path) == 0) {
            req.url = req.url.slice(path.length);
            static(req, res, next);
        } else {
            next();
        }
    };
};

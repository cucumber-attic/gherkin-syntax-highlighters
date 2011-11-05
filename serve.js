var path = require('path')
  , http = require('http')
  , paperboy = require('paperboy');

http.createServer(function(req, res) {
  paperboy.deliver(path.dirname(__filename), req, res)
}).listen(3001);

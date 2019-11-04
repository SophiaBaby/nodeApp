var http = require("http");
var url = require("url");
var formidable = require("formidable");

function start(route, handle){
  function onRequest(req,res){
    var pathName = url.parse(req.url).pathname;
    console.log('req ' + pathName + ' received')
    route(handle, pathName, res, req);
  }

  http.createServer(onRequest).listen(8888)
  console.log('server has started')
}

exports.start = start;
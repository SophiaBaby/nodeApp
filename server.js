var http = require("http");
var url = require("url");
var formidable = require("formidable");

function start(route, handle){
  function onRequest(req,res){
    var postData = "";
    var pathName = url.parse(req.url).pathname;
    console.log('req ' + pathName + ' received')

    req.setEncoding("utf8");

    req.addListener("data",function (postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk" + postDataChunk + ".");
    })
    req.addListener("end",function () {
      route(handle, pathName, res, postData);
    })
  }

  http.createServer(onRequest).listen(8888)
  console.log('server has started')
}

exports.start = start;
var exec = require("child_process").exec;
var queryString = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response, postData) {
  console.log('request handler start was called')

    var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<form action="/upload" method="post" enctype="multipart/form-data"> '+
      '<input type="file" name="upload">'+
      '<input type="submit" value="Upload file" />'+
      '</body>'+
      '</html>';
  response.writeHead(200, {"Content-Type": "text/html"}); response.write(body);
  response.end();

  // exec("find /",
  //   { timeout: 10000, maxBuffer: 20000*1024 },
  //   function (error, stdout, stderr) {
  //   response.writeHead(200,{"Content-Type":"text/plain"});
  //   response.write(stdout);
  //   response.end();
  // })
}

function upload(response, request) {
  console.log('request handler upload was called');

  var form = new formidable.IncomingForm();
  console.log("about to parse");

  form.parse(request, function (err, fields, files) {
    console.log("parse done",fields,files);
    fs.renameSync(files.upload.path, "./tmp/test.png");
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write("<img src='/show'>");
    response.end();
  })
}

function show(response, postData){
  console.log("show was called");
  fs.readFile("./tmp/test.png","binary", function (err, file) {
    if(err){
      response.writeHeader(500,{"Content-Type":"text-plain"});
      response.write(err + '\n');
      response.end();
    }else {
      response.writeHead(200, {"Content-Type":"text-plain"});
      response.write(file,"binary");
      response.end();
    }
  })
}


exports.start = start;
exports.upload = upload;
exports.show = show;

/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, 
module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, 
util: false, __filename: false, __dirname: false */

var express = require("express"),
    service = require("./service");
    jslint = require("./jslint");

var port = Number(process.env.VCAP_APP_PORT || 9000),
    host = process.env.VCAP_APP_HOST || 'localhost';

var app = express.createServer();

express.bodyParser.parse['plain/text'] = function(body) { 
    return body.split('\n'); 
};

app.use(express.bodyParser());

app.post('/:filename', function(req, res) {
  var response = service.validate(req.rawBody);
  res.contentType('application/json');
  res.send(JSON.stringify(response));
});

app.get('/', function(req, res) {
  var doc = 'Hello. This is JSLint web serice. Post a JavaScript file and get back JSON validation report.<br>';
  doc += '<br>The service requires the Content Type of the POST to be set to plain/text.<br>';
  doc += 'Example:<br>';
  doc += 'cat myfile.js | curl -X POST -T - -H "Content-Type: plain/text" http://jslint.cloudfoundry.com<br>';
  doc += 'Returns {"status":"OK"} if no errors are found<br>';
  doc += 'If JSLint finds errors they will be reported in the "errors" array eg. {"status":"ERROR", "errors" : [{"line": 123, reason: "Unused variable x", "evidence": "var x;"}]}';
  res.send(doc);
});


// start the app
app.listen(port, host);



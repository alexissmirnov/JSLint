/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, 
module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, 
util: false, __filename: false, __dirname: false */

var assert = require("assert"),
    service = require("../service");

assert.equal(service.validate("var a = 0;").status, "OK", "Valid code doesn't return OK");
assert.equal(service.validate("a = 0").status, "ERROR", "Invalid code doesn't return ERROR");

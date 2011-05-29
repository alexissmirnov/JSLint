/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, 
module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, 
util: false, __filename: false, __dirname: false */

/*
 * Module Dependencies
 */
var express = require("express"),
    jslint = require("./jslint");

var exports = module.exports;

exports.validate = function(input) {
  var response = {};
  if( jslint(input, {passfail: false}) ) {
      response.status = "OK";
  } else {
      response.status = "ERROR";
      response.errors = [];
      jslint.errors.forEach(function(error) {
          if( error ) {
              response.errors.push({
              line: error.line, 
              character: error.character, 
              reason: error.reason, 
              evidence: error.evidence});
          }
      });
  }
  return response;
}

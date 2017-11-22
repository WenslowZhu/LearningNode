"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = require('./data.json');
console.log(data.name);
fs.readFile('./data.json', 'utf-8', function (err, data) {
    var jsonData = JSON.parse(data);
    console.log(jsonData.name);
});
console.log('This is first');

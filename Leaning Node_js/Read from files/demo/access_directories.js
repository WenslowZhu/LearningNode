"use strict";
exports.__esModule = true;
var fs = require("fs");
fs.readdir('./', function (err, data) {
    console.log(data);
});

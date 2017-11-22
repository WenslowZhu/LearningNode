"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = {
    name: 'Bob'
};
fs.writeFile('./data01.json', JSON.stringify(data), function (err) {
    if (err) {
        console.log(err);
    }
});

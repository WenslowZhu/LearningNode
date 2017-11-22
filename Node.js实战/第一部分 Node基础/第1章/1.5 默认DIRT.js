/**
 * Created by wenslow on 2017/6/15.
 */

'use strict';

var http = require('http'),
    fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream('./BFF6A234-8773-4032-95DE-77F648FA696C.png').pipe(res);
}).listen(3000);
console.log('Server running at http://localhost:3000/');
//

// var fs = require('fs');
// var stream = fs.createReadStream('./launchScreen.json');
//
// stream.on('data', function (chunck) {
//     console.log(chunck);
// });
// stream.on('end', function () {
//     console.log('finished');
// });

// var http = require('http');
// var server = http.createServer();
// server.on('request', function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World');
// });
// server.listen(3000);
// console.log('Server running at http://localhost:3000');

// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World');
// }).listen(3000);
// console.log('Server running at http://localhost:3000');

// var fs = require('fs');
//
// fs.readFile('./launchScreen.json', 'utf8', function (er, data) {
//     console.log(data);
// });
//
// console.log('123');
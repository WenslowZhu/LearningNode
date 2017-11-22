/**
 * Created by wenslow on 2017/6/18.
 */
'use strict';

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    getTitles(res);
}).listen(8000, '127.0.0.1');

function getTitles(res) {
    fs.readFile('./titles.json', function (err, data) {
        if (err) {
            hadError(err, res);
        }
        else{
            getTemplate(JSON.parse(data.toString()), res);
        }
    });
}

function getTemplate(titles, res) {
    fs.readFile('./template.html', function (err, data) {
        if (err){
            hadError(err, res)
        }
        else{
            formatHtml(titles, data.toString(), res);
        }
    });
}

function formatHtml(titles, tmpl, res) {
    var html = tmpl.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}

function hadError(err, res) {
    console.log(err);
    res.end('Server Error');
}

// http.createServer(function (req, res) {
//     if (req.url === '/'){
//         //读取json文件
//         fs.readFile('./title.json', function (err, data) {
//             if (err){
//                 console.log(err);
//                 res.end('Server Error');
//             }
//             else{
//                 //从json文本中解析数据
//                 var titles = JSON.parse(data.toString());
//
//                 fs.readFile('/.template.html', function (err, data) {
//                     if (err){
//                         console.log(err);
//                         res.end('Server Error');
//                     }
//                     else{
//                         var tmpl = data.toString();
//
//                         var html = tmpl.replace('%', titles.join('</li><li>'));
//                         res.writeHead(200, {'Content-Type': 'text/html'});
//                         res.end(html);
//                     }
//                 })
//             }
//         })
//     }
// }).listen(8000, '127.0.0.1');
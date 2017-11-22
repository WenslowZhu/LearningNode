/**
 * Created by wenslow on 2017/6/19.
 */

'use strict';

var http = require('http'),
    url = require('url'),
    items = [];

var server = http.createServer((req, res) => {
    switch (req.method){
        case 'POST':
            var item = '';//对进来的事项设置字符串缓存
            req.setEncoding('utf8');//将进来的data事件编码为UTF-8字符串
            req.on('data', (chunk) =>{
                item += chunk;//将数据拼接到缓存上
            });
            req.on('end', ()=>{
                items.push(item);//将完整的新事项压入事项数组中
                res.end('OK\n');
            });
            break;
        case 'GET':
            var body = items.map((item, i)=>{
                return i + ') ' + item;
            }).join('\n');
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain');
            res.setEncoding('utf-8');
            res.end(body);
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);
            //检查数字是否有效
            if (isNaN(i)){
                res.statusCode = 400;
                res.end('Invalid item id');
            }else if (!items[i]){
                //确保请求的索引存在
                res.statusCode = 404;
                res.end('Item not found');
            }else {
                //删除请求的事项
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
        default:
            break;
    }
});
server.listen(3000);



// var server = http.createServer((req, res) => {
//     var url = 'http://google.com';
//     var body = '<p>Redirecting to <a href="' + url + '">' + url + '</a></p>';
//     res.setHeader('Location', url);
//     res.setHeader('Content-Length', body.length);
//     res.setHeader('Content-Type', 'text/plain');
//     res.statusCode = 302;
//     res.end(body);
// });
// server.listen(3000);
// var server = http.createServer((req, res) => {
//     var body = 'Hello World';
//     res.setHeader('Content-Length', body.length);
//     res.setHeader('Content-Type', 'text/plain');
//     res.end(body);
//     });
// server.listen(3000);
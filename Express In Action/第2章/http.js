/**
 * Created by wenslow on 2017/7/8.
 */

'use strict';

const http = require('http');

// 定义一个函数用来处理即将到来的HTTP请求
function requestHandler(req, res) {
    console.log('In comes a request to: ' + req.url);
    res.end('Hello world!\n');
}

//创建一个服务器并用你的函数去处理请求
const server = http.createServer(requestHandler);

server.listen(3000);//启动服务器并监听3000端口
/**
 * Created by wenslow on 2017/6/15.
 */
'use strict';

//内置的http模块，提供了HTTP服务器和客户端功能
var http = require('http');

var fs = require('fs');

//内置的path模块，提供了与文件系统路径相关的功能
var path = require('path');

//附加的mime模块，有根据文件扩展名得出MIME类型的能力
var mime = require('mime');

//用来缓存文件内容的对象
var cache = {};

/**
 * 当文件不存在时发送404错误
 * @param response
 */
function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found');
    response.end();
}

/**
 * 提供文件服务
 * @param response
 * @param filePath 文件路径，用于判断文件MIME类型
 * @param fileContent 文件内容
 */
function sendFile(response, filePath, fileContent) {
    response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
    response.end(fileContent);
}

/**
 * 静态服务
 * @param response
 * @param cache 缓存
 * @param absPath 路径
 */
function serverStatic(response, cache, absPath) {
    if (cache[absPath]) {//检查文件是否被缓存到内存中
        sendFile(response, absPath, cache[absPath]);//从内存中返回文件
    }else{
        fs.exists(absPath, function (exists) {//检查文件是否存在
            if (exists){
                fs.readFile(absPath, function (err, data) {//从硬盘中读取文件
                    if (err){
                        send404(response);
                    }else{
                        cache[absPath] = data;//从硬盘中读取文件并返回
                        sendFile(response, absPath, data);
                    }
                })
            }else{
                send404(response);//发送HTTP404响应
            }
        })
    }
}

/**
 * 创建HTTP服务器，用匿名函数定义对每个请求的处理行为
 */
var server = http.createServer(function (request, response) {
    var filePath = false;

    if (request.url == '/'){
        filePath = 'public/index.html';//确认返回默认的HTML文件
    }else{
        filePath = 'public' + request.url;//将URL路径转为文件的相对路径
    }

    var absPath = './' + filePath;
    serverStatic(response, cache, absPath);//返回静态文件
});

server.listen(3000, function () {
    console.log('Server listening on port 3000.');
});

/**
 * 加载聊天功能
 * @type {*}
 */
var chatServer = require("./lib/chat_server")
chatServer.listen(server);
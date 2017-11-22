/**
 * Created by wenslow on 2017/6/19.
 */
'use strict';

var http = require('http'),
    parse = require('url').parse,
    join = require('path').join,
    fs = require('fs'),
    root = __dirname;

var server = http.createServer((req, res)=>{
    var url = parse(req.url);
    var path = join(root, url.pathname);//得到绝对路径

    fs.stat(path, (err, stat)=>{
        if (err){//检查文件是否存在
            if ('ENOENT' === err.code){
                res.statusCode = 404;
                res.end('Not Found');
            }else{
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }else{
            res.setHeader('Content-Length', stat.size);//用stat对象的属性设置Content-Length
            var stream = fs.createReadStream(path);//创建fs.ReadStream
            stream.pipe(res);//res.end()会在stream.pipe()中调用
            stream.on('error', (err)=>{
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        }
    });
});

server.listen(3000);

/**
 * Created by wenslow on 2017/7/5.
 */

'use strict';

const http = require('http');
const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plaint'});
    res.end('handled by child, pid is ' + process.pid + '\n');
});

let worker;

process.on('message', (m, tcp)=>{
    if (m === 'server'){
        worker = tcp;
        worker.on('connection', (socket)=>{
            server.emit('connection', socket);
        });
    }
});

process.on('uncaughtException', (err)=>{

    //记录日志
    logger.error(err);

    process.send({act: 'suicide'});

    //停止接受新的连接
    worker.close(()=>{
        //所有已有连接断开,退出进程
        process.exit(1);
    });

    // 5秒钟之后推出进程
    setTimeout(()=>{
        process.exit(1);
    }, 5000);
});
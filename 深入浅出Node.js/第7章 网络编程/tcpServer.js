/**
 * Created by wenslow on 2017/6/28.
 */
'use strict';

const net = require('net');

const server = net.createServer((socket)=>{
    // //新的连接
    // socket.on('data', (data)=>{
    //     socket.write('你好\n');
    // });
    //
    // socket.on('end', ()=>{
    //     console.log('连接断开');
    // });
    //
    // socket.write('欢迎光临<深入浅出Node.js> 示例: \n');

    socket.write('Echo server\n');
    socket.pipe(socket);
});

server.listen(8124, ()=>{
    console.log('server bound');
});
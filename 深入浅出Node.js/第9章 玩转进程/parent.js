/**
 * Created by wenslow on 2017/7/5.
 */

'use strict';

const child = require('child_process').fork('child.js');

const server = require('net').createServer();

server.on('connection', (socket)=>{
    socket.end('handle by parent\n');
});

server.listen(1337, ()=>{
    child.send('server', server);
});
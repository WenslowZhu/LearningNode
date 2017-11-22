/**
 * Created by wenslow on 2017/7/5.
 */

'use strict';

const http = require('http');
const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plaint'});
    res.end('handled by child, pid is ' + process.pid + '\n');
});

process.on('message', (m, tcp)=>{
    if (m === 'server'){
        tcp.on('connection', (socket)=>{
            server.emit('connection', socket);
        });
    }
});


// process.on('message', (m, server)=>{
//     if (m === 'server'){
//         server.on('connection', (socket)=>{
//             socket.end('handled by child\n');
//         });
//     }
// });
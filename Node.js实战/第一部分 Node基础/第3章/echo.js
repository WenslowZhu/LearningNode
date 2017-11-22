/**
 * Created by wenslow on 2017/6/18.
 */
'use strict';

var net = require('net');

var server = net.createServer(function (socket) {
   socket.on('data', function (data) {
       socket.write(data);
       console.log('AA');
   });
});

server.listen(8888);
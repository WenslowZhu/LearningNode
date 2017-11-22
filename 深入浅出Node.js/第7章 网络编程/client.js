/**
 * Created by wenslow on 2017/6/28.
 */

'use strict';

const http = require('http');

const options = {
    hostname: '127.0.0.1',
    port: 1337,
    path: '/',
    method: 'GET'
};

const req = http.request(options, (res)=>{
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', (chunk)=>{
        console.log(chunk);
    });
});

req.end();


// const dgram = require('dgram');
//
// const message = new Buffer('深入浅出Node.js');
//
// const client = dgram.createSocket('udp4');
// client.send(message, 0, message.length, 41234, 'localhost', (err, bytes)=>{
//     client.close();
// });
/**
 * Created by wenslow on 2017/7/6.
 */

'use strict';

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster){
    //Fork workers
    for  (let i = 0; i<numCPUs; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal)=>{
        console.log('worker' + worker.process.pid + ' died');
    });
}else{
    //Worker can share any TCP connection
    //In this case its a HTTP server
    http.createServer((req, res)=>{
        res.writeHead(200);
        res.end('Hello World \n');
    }).listen(8000);
}
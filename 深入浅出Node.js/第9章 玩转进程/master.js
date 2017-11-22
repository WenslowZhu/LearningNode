/**
 * Created by wenslow on 2017/7/5.
 */

'use strict';

const fork = require('child_process').fork;
const cups = require('os').cpus();

const server = require('net').createServer();
server.listen(1337);

let workers = {};
const  creatWorker = ()=>{
    const worker = fork(__dirname + '/worker.js');

    //接受自杀信号,启动新的进程
    worker.on('message', (message)=>{
        if (message.act === 'suicide'){
            creatWorker();
        }
    });

    //退出时重新启动新的进程
    worker.on('exit', ()=>{
        console.log('Worker ' + worker.pid + ' exited.');
        delete workers[worker.pid];
    });

    //句柄转发
    worker.send('server', server);
    workers[worker.pid] = worker;
    console.log('Create worker. pid: ' + worker.pid);
};

for (let i = 0; i<cups.length; i++){
    creatWorker();
}

//进程退出时, 让所有工作进程退出
process.on('exit', ()=>{
    for (const pid in workers){
        workers[pid].kill();
    }
});
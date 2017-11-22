/**
 * Created by wenslow on 2017/7/6.
 */

'use strict';

const cluster = require('cluster');

cluster.setupMaster({
    exec: 'worker.js'
});

const cpus = require('os').cpus();
for (let i = 0; i<cpus.length; i++){
    cluster.fork();
}
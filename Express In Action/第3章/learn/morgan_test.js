/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const logger = require('morgan');
const http = require('http');

const app = express();

//记录日志
app.use(logger('short'));

app.use((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello world!\n');
});

app.listen(3000);
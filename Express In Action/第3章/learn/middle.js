/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const app = express();

// 日志记录中间件
app.use((req, res, next)=>{
    console.log('In come a ' + req.method + ' to ' + req.url);
    next()
});

//发送时记响应
app.use((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello world!\n');
});

app.listen(3000);
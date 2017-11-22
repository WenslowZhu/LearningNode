/**
 * Created by wenslow on 2017/7/8.
 */

'use strict';

const express = require('express');

const app = express();//创建一个新的Express应用程序

app.use((req, res)=>{
    console.log('In comes a requset to: ' + req.url);
    res.end('Hello world\n');
});

app.listen(3000);//启动服务器
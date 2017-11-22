/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

const publicPath = path.resolve(__dirname, 'public');// 使用Node的path模块设置public的路径

app.use(express.static(publicPath));// 从publicPath目录发送静态文件

app.use((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Looks like you didn\'t find a static file.\n');
});

app.listen(3000);
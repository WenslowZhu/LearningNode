/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

//设置静态文件中间件
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//当请求根目录的时候调用
app.get('/', (req, res)=>{
    res.end('Welcome to my homepage.\n');
});

//当请求/about的时候调用
app.get('/about', (req, res)=>{
    res.end('Welcome to the about page.\n');
});

//当请求/weather的时候被调用
app.get('/weather', (req, res)=>{
    res.end('The current weather is NICE!\n');
});

//指定"hello"为路由的固定部分
app.get('/hello/:who', (req, res)=>{
    res.end('Hello, ' + req.params.who + '.\n');
});

//最后处理的中间件
app.use((req, res)=>{
    res.statusCode = 404;
    res.end('404');
});

app.listen(3000);